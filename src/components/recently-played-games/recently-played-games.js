import React, { Component } from 'react';

import './recently-played-games.css';
import steamService from "../../services/steamService";
import Loader from "../loader";
import Utils from "../../gears/utils";

export default class RecentlyPlayedGames extends Component {
	_isMounted = false;
	state = {
		games: null,
		loading: true,
	};
	steam = new steamService();

	componentDidMount(){
		this._isMounted = true;
		this.updateData();
	}

	updateData() {
		const { steamid } = this.props;
		if (!steamid) {
			return;
		}
		this.setState({
			loading: true
		});

		this.steam.getRecentlyPlayedGames(steamid)
		.then((data) => {
			if (this._isMounted) {
				const games = data.response.games;
				this.setState({
					loading: false,
					games
				});
			}
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.steamid !== prevProps.steamid) {
			this.updateData();
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render(){
		const {games, loading} = this.state;

		if (loading) {
			return <Loader/>
		}

		const utils = new Utils();
		let gamesList = [];
		for (let i in games) {
			gamesList.push(<Game game={games[i]} key={games[i]['appid']} />)
		}
		return (
			<div className = "card border-secondary">
				<div className = "card-header"><h4>Recently played games ({gamesList.length})</h4></div>
				<div className="card-body">
					{gamesList}
				</div>
			</div>
		);
	};
}

const Game = ({game}) => {
	const imgUrl = "http://media.steampowered.com/steamcommunity/public/images/apps/" + game.appid + "/" + game.img_logo_url + ".jpg";
	return (
		<div className="row">
			<div>
				<span><img src={imgUrl} alt="game icon" /></span>
				<span>{game.name} <br/></span>
				<span><b></b></span>
			</div>
		</div>
	);
};