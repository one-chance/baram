import React, { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Loading from './Loading';

// import { initFirebase } from './shared/Firebase';

interface IState {
	isLoadded: boolean,
}

export default class Root extends Component<{}, IState> {
	constructor(props: {}) {
		super(props);

		this.state = {
				isLoadded: true,
		}

		/*
		initFirebase()
			.then(() => {
				this.setState({
					isLoadded: true,
				});
			});
		*/
	}
	
	render() {
		const { isLoadded } = this.state;

		return (
			<BrowserRouter>
				{isLoadded ?
					<App/> :
					<Loading/>
				}
			</BrowserRouter>
		)
	}
}