import React, { Component } from 'react';

import './friend-list.css';
import steamService from "../../services/steamService";
import Loader from "../loader";
import Friend from "../friend";

export default class FriendList extends Component {

	state = {
		loading: true,
		friendslist: null
	};
	steam = new steamService();

	componentDidMount(){
		this.updateFriendList();
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		if (prevProps.steamid != this.props.steamid) {
			this.updateFriendList();
		}
	}

	updateFriendList(){
		const { steamid } = this.props;
        if (!steamid) {
            return;
        }
		this.setState({loading: true});
		this.steam.getFriendList(steamid).then((data) => {
			const friendslist = data && data.friendslist && data.friendslist.friends ? data.friendslist.friends : null;
			console.log(data);
			this.setState({
				loading: false,
				friendslist: friendslist
			})
		});
	}

	render(){
		const {setPlayer} = this.props;
		const {friendslist, loading} = this.state;

		if (loading) {
			return <Loader/>
		} 
		
		console.log(friendslist);

		let friends = [];
		for (const i in friendslist) {
			const id = friendslist[i]['steamid'];
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