import React, { Component } from 'react';

import './app.css';


import steamService from "../../services/steamService";
import Header from "../header";
import Loader from '../loader';
import PlayerSummaries from '../player-summaries/player-summaries';

export default class App extends Component {

    state = {
        currentPlayerId: '76561197998250364',
        playerSummary: null
    };

    getPlayerSummary = () => {
        const steam = new steamService();
        steam.getPlayerSummaries(this.state.currentPlayerId).then((data) => {
            this.setState({
                playerSummary: data
            })
        });
    };

    render(){
        const {playerSummary} = this.state;
        if (!playerSummary) {
            this.getPlayerSummary();
        }
        
        const playerInfo = playerSummary ? <PlayerSummaries playerData={playerSummary.response.players[0]} /> : <Loader/>;
        return(
            <div>
                <Header />
                <div className="container main">
                    {playerInfo}
                </div>
            </div>
        );
    }
}