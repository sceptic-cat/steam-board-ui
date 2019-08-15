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
		const {steamid} = this.props;
		const {friendsList} = this.state;

		if (!friendsList) {
			this.getFriendList(steamid);
			return <Loader/>
		} else {
			let friends = [];
			for (const i in friendsList) {
				friends.push(<Friend steamid={friendsList[i]['steamid']} />)
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