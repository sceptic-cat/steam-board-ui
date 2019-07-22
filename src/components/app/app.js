import React, { Component } from 'react';

import './app.css';


import steamService from "../../services/steamService";
import Header from "../header";

export default class App extends Component {

    state = {
        playerSummary: null
    };

    getPlayerSummary = () => {
        const steam = new steamService();
        steam.getPlayerSummaries(76561197998250364).then((data) => {
            this.setState({
                playerSummary: data.toString()
            })
        });
    };

    render(){
        if (!this.state.playerSummary) {
            console.log();
            this.getPlayerSummary();
        }
        console.log(this.state.playerSummary);
        return(
            <div>
                <Header />
                <div>{this.state.playerSummary}</div>
            </div>
        );
    }
}