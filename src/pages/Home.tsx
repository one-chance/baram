import React, {Component} from 'react';

import MainCarousel from 'components/MainCarousel';

interface IProps {

}

interface IState {
    menu: "menu1" | "menu2"
}

class Home extends Component <IProps, IState>{

	constructor(props: IProps) {
		super(props);

		this.state = {
			menu: "menu1"
		}
	}

	render(){
		return(
			<div>
				<MainCarousel/>
			</div>
		);
	}
}

export default Home;