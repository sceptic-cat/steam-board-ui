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


		let gamesList = [];
		for (let i in games) {
			gamesList.push(<Game game={games[i]} key={games[i]['appid']} />)
		}
		return (
			<div className="recently-played-games card border-secondary">
				<div className="card-header"><h4>Recently played games ({gamesList.length})</h4></div>
				<div className="card-body">
					{gamesList}
				</div>
			</div>
		);
	};
}

const Game = ({game}) => {
	const utils = new Utils();
	const playedToWeek = utils.minutesToHour(game.playtime_2weeks),
		  playTimeForever = utils.minutesToHour(game.playtime_forever);
	const imgUrl = "http://media.steampowered.com/steamcommunity/public/images/apps/" + game.appid + "/" + game.img_logo_url + ".jpg";
	return (
		<div>
			<div className="row">
				<div className="col-auto"><img src={imgUrl} alt="game icon" /></div>
				<div className="col recently-game-info">
					<span className="recently-game-info-line"><a href="#">{game.name}</a><br /></span>
					<span className="recently-game-info-line"><b>Played to weeks:</b> {playedToWeek}<br /></span>
					<span className="recently-game-info-line"><b>Play time forever:</b> {playTimeForever}</span>
				</div>
			</div>
		</div>
	);
};