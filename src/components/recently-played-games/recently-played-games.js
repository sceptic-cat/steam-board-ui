import React, { Component } from 'react';

import './recently-played-games.css';

export default class RecentlyPlayedGames extends Component {
	render(){

		let {gamesList} = this.props;

		return (
			<div className="row">
				<div>
					<span>{gamesList.toString()}</span>
				</div>
			</div>
		);
	}
}