import React, { Component } from 'react';

import './app.css';


import steamService from "../../services/steamService";
import Header from "../header";
import Loader from '../loader';
import PlayerSummaries from '../player-summaries/player-summaries';
import RecentlyPlayedGames from "../recently-played-games/recently-played-games";
import FriendList from "../friend-list";
import OwnedGames from "../owned-games";

export default class App extends Component {

    state = {
        currentPlayerId: '76561197998250364'
    };

    setPlayer = (steamid) => {
        this.setState({
            currentPlayerId: steamid
        })
    };

    render(){

        return(
            <div>
                <Header />
                <div className="container main">
                    <div className="row">
                        <div className="col-md-9">
                            <PlayerSummaries steamid={this.state.currentPlayerId} />
                            <RecentlyPlayedGames steamid={this.state.currentPlayerId}/>
                            <OwnedGames steamid={this.state.currentPlayerId}/>
                        </div>
                        <div className="col-md-3">
                            <FriendList steamid={this.state.currentPlayerId} setPlayer={this.setPlayer} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}