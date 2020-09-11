import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import MyButton from 'elements/MyButton';

import { SignInUser } from 'utils/UserUtil';

const useStyles = makeStyles((theme) => ({
	form: {
		marginTop: 0,
	},
	signin: {
		marginTop: 20,
	},
}));

export default function SignIn() {
  const classes = useStyles();

	const [id, setId] = React.useState("");
	const [password, setPassword] = React.useState("");

	const refId = React.useRef<any>();
	const refPassword = React.useRef<any>();

	const _onEnterPassword = (keyCode: number) => {
		if (keyCode == 13) {
			_onSignIn();
		}
	}

	const _onSignIn = () => {
		if ( id.length < 1 ) {
			alert("PLEASE INPUT USER ID");
			refId.current.focus();

			return false;
		}

		if ( password.length < 1 ) {
			alert("PLEASE INPUT PASSWORD");
			refPassword.current.focus();

			return false;
		}

		SignInUser(id, password);

		document.location.href="/";
	}

  return (
    <React.Fragment>
			<Container 
				component="main" 
				maxWidth="xs">
					<form
						noValidate 
						className={classes.form}>
							<Grid container spacing={2}>
								<Grid container item xs={12}>
									<TextField
											variant="outlined"
											required
											fullWidth
											margin="dense"
											id="id"
											name="id"
											label="User ID"
											autoComplete="id"
											value={id}
											inputRef={refId}
											onChange={(e) => setId(e.target.value)}
									/>
									<Link href="/findid" variant="body2" tabIndex={-1}>
											아이디 찾기
									</Link>
								</Grid>
								<Grid container item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										margin="dense"
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="current-password"
										value={password}
										inputRef={refPassword}
										onChange={(e) => setPassword(e.target.value)}
										onKeyUp={(e) => _onEnterPassword(e.keyCode)}
									/>
									<Link href="/findpw" variant="body2" tabIndex={-1}>
											비밀번호 찾기
									</Link>
								</Grid>
							</Grid>
							<Grid container item xs={12}
								justify="flex-end"
								className={classes.signin}>
									<MyButton
										color="red"
										text="로그인"
										onClick={_onSignIn}/>
							</Grid>
					</form>
			</Container>
    </React.Fragment>
  );
}