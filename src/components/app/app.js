import React, { Component } from 'react';

import './app.css';


import steamService from "../../services/steamService";
import Header from "../header";
import Loader from '../loader';
import PlayerSummaries from '../player-summaries/player-summaries';
import RecentlyPlayedGames from "../recently-played-games/recently-played-games";

export default class App extends Component {

    state = {
        currentPlayerId: '76561197998250364',
        playerSummary: null,
        recentlyPlayedGames: null
    };

    getPlayerSummary = () => {
        const steam = new steamService();
        steam.getPlayerSummaries(this.state.currentPlayerId).then((data) => {
            this.setState({
                playerSummary: data
            })
        });
    };

    getRecentlyPlayedGames  = () => {
        const steam = new steamService();
        steam.getRecentlyPlayedGames(this.state.currentPlayerId).then((data) => {
            this.setState({
                recentlyPlayedGames: data
            })
        });
    };

    render(){
        const {playerSummary, recentlyPlayedGames} = this.state;
        if (!playerSummary) {
            this.getPlayerSummary();
        }
        if (!recentlyPlayedGames) {
            this.getRecentlyPlayedGames();
        }
        
        const playerSummaryEl = playerSummary ? <PlayerSummaries playerData={playerSummary.response.players[0]} /> : <Loader/>;
        const recentlyPlayedGamesEl = recentlyPlayedGames ? <RecentlyPlayedGames gamesList={recentlyPlayedGames.response} /> : <Loader/>;
        return(
            <div>
                <Header />
                <div className="container main">
                    {playerSummaryEl}
                    {recentlyPlayedGamesEl}
                </div>
            </div>
        );
    }
}