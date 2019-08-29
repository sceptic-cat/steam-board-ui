import React, { Component } from 'react';

import './friend.css';
import Loader from "../loader";
import Utils from "../../gears/utils";
import steamService from "../../services/steamService";
import Personastate from "../personstate";

export default class Friend extends Component {
	state = {
		player: null
	};
	steam = new steamService();

	getPlayerSummary = (steamid) => {
		this.steam.getPlayerSummaries(steamid).then((data) => {
			const playerData = data.response.players[0];
			this.setState({
				player: playerData
			})
		});
	};

	setPlayer = (e) => {
		this.props.setPlayer(this.props.steamid);
	};

	render(){
		const {steamid, setPlayer} = this.props;
		const {player} = this.state;

		if (!player) {
			this.getPlayerSummary(steamid);
			return (<div><Loader/></div>)
		}

		const utils = new Utils();
		const lastlogoff = utils.timestampToDate(player.lastlogoff);

		return (
			<div className="friendCard">
				<div className="friendCardAvatar">
					<img alt="avatar" src={player.avatarmedium} onClick={() => {this.setPlayer(steamid)}} />
				</div>
				<div className="friendCardInfo">
					<p><b onClick={() => {this.setPlayer(steamid)}}>{player.personaname}</b></p>
					<p><Personastate state={player.personastate} /></p>
					<p>Last log off: <span className="text-secondary">{lastlogoff}</span></p>
				</div>
			</div>
		);
	};
}