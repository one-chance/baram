import React, {useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IPost from 'interfaces/Board/IPost';

import MainCarousel from 'components/MainCarousel';
import LatestBoardPaper from 'components/Board/LatestBoardPaper';

import {getPosts} from 'utils/PostUtil';

const useStyles = makeStyles(theme => ({
  secondSection: {
    marginTop: "50px",
  },
}));

const VIEW_COUNT = 5;

const getFree = async () => {
	return await getPosts('free', `latestCount=${VIEW_COUNT}`);
}
const getTip = async () => {
	return await getPosts('tip', `latestCount=${VIEW_COUNT}`);
}

const Home = () => {
	const classes = useStyles();

	const [freePosts, setFreePosts] = React.useState<Array<IPost>>([]);
	const [tipPosts, setTipPosts] = React.useState<Array<IPost>>([]);

	useEffect(() => {
		getFree()
			.then((res) => {
				setFreePosts(res);
			})
			.catch((e) => {

			});

		getTip()
			.then((res) => {
				setTipPosts(res);
			})
			.catch((e) => {

			});
	}, []);

	return(
		<Grid container>
			<Grid item xs={12}>
				<MainCarousel/>
			</Grid>
			<Grid container item spacing={3}
				className={classes.secondSection}>
				<Grid item xs={6}>
					<LatestBoardPaper
						category="free"
						posts={freePosts}/>
				</Grid>
				<Grid item xs={6}>
					<LatestBoardPaper
						category="tip"
						posts={tipPosts}/>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Home;