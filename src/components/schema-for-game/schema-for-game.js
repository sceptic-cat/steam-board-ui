import React, { Component } from 'react';

import './schema-for-game.css';

import Loader from "../loader";
import steamService from "../../services/steamService";

export default class SchemaForGame extends Component {
    _isMounted = false;
    state = {
        gameData: null,
        loading: true,
    };
    steam = new steamService();

    componentDidMount(){
        this._isMounted = true;
        this.updateGameData();
    }

    updateGameData() {
        const { appid } = this.props;
        if (!appid) {
            return;
        }
        this.setState({
            loading: true
        });

        this.steam.getSchemaForGame(appid)
            .then((data) => {
                if (this._isMounted) {
                    const gameData = data.game;
                    this.setState({
                        loading: false,
                        gameData
                    });
                }
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.appid !== prevProps.appid) {
            this.updateGameData();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        const {gameData, loading} = this.state;

        if (loading) {
            return <Loader/>
        }

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

