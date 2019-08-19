import React, { Component } from 'react';

import './friend-list.css';
import steamService from "../../services/steamService";
import Loader from "../loader";
import Friend from "../friend";

export default class FriendList extends Component {

	state = {
		friendsList: null
	};
	steam = new steamService();

	getFriendList = (steamid) => {
		this.steam.getFriendList(steamid).then((data) => {
			this.setState({
				friendsList: data.friendslist.friends
			})
		});
	};

	render(){
		const {steamid, setPlayer} = this.props;
		const {friendsList} = this.state;

		if (!friendsList) {
			this.getFriendList(steamid);
			return <Loader/>
		} else {
			let friends = [];
			for (const i in friendsList) {
				const id = friendsList[i]['steamid'];
				friends.push(<Friend key={id} steamid={id} setPlayer={setPlayer} />)
			}
			return (
				<div>
					<h3 className="text-center">Friends list</h3>
					{friends}
				</div>
			);
		}


	}
}