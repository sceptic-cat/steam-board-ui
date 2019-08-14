import React, { Component } from 'react';

import './player-summaries.css';

import Utils from '../../gears/utils';
import Loader from "../loader";
import steamService from "../../services/steamService";

export default class PlayerSummaries extends Component {
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

    render(){
        const {steamid} = this.props;
        const {player} = this.state;

        if (!player) {
            this.getPlayerSummary(steamid);
            return <Loader/>
        }

        const utils = new Utils();
        const lastlogoff = utils.timestamToDate(player.lastlogoff);

        return (
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-5 col-xs-6">
                    <img alt="avatar" src={player.avatarfull} />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-7 col-xs-6">
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <th scope="row">Personaname</th>
                                <td>{player.personaname}</td>
                            </tr>
                            <tr>
                                <th scope="row">Personastate</th>
                                <td><Personastate state={player.personastate} /></td>
                            </tr> 
                            <tr>
                                <th scope="row">Lastlogoff</th>
                                <td>{lastlogoff}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}

const Personastate = ({state}) => {
    let textCls = 'text-info', translation = 'sdsd';
    switch (state) {
        case 0: 
            textCls = 'text-secondary';
            translation = 'Offline';
            break;
        case 1: 
            textCls = 'text-success';
            translation = 'Online';
            break;
        case 2: 
            textCls = 'text-danger';
            translation = 'Busy';
            break;
        case 3: 
            textCls = 'text-warning';
            translation = 'Away';
            break;
        case 4: 
            textCls = 'text-primary';
            translation = 'Snooze';
            break;
        case 5: 
            textCls = 'text-success';
            translation = 'Looking to trade';
            break;
        case 6: 
            textCls = 'text-success';
            translation = 'Looking to play';
            break;
    }
    return (<span className={textCls}>{translation}</span>);
};