import React, { Component } from 'react';

import './player-summaries.css';

import Utils from '../../gears/utils';
import Loader from "../loader";
import Personastate from "../personstate";
import steamService from "../../services/steamService";

export default class PlayerSummaries extends Component {
    state = {
        player: null,
        loading: true,
    };
    steam = new steamService();

    componentDidMount(){
        this.updatePlayerData();
    }

    updatePlayerData() {
        const { steamid } = this.props;
        if (!steamid) {
            return;
        }
        this.setState({
            loading: true
        });

        this.steam.getPlayerSummaries(steamid)
            .then((data) => {
                const player = data.response.players[0];
                this.setState({
                    loading: false,
                    player
                });
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.steamid !== prevProps.steamid) {
            this.updatePlayerData();
        }
    }

    render(){
        const {player, loading} = this.state;

        if (loading) {
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

