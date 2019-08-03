import React, { Component } from 'react';

import './player-summaries.css';

import Utils from '../../gears/utils';

export default class PlayerSummaries extends Component {
    render(){
        const {playerData: player} = this.props;
        const utils = new Utils();
        const lastlogoff = utils.timestamToDate(player.lastlogoff);

        return (
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-5 col-xs-6">
                    <img alt="avatar" src={player.avatarfull} />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-7 col-xs-6">
                    <table className="table table-hover">
                        <tr>
                            <th scope="row">Personaname</th>
                            <td>{player.personaname}</td>
                        </tr>
                        <tr>
                            <th scope="row">Personastate</th>
                            <td>{player.personastate}</td>
                        </tr> 
                        <tr>
                            <th scope="row">Lastlogoff</th>
                            <td>{lastlogoff}</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    };
}