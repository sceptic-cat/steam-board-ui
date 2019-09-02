import React, { Component } from 'react';

import './owned-games.css';

import Loader from "../loader";
import steamService from "../../services/steamService";
import Utils from "../../gears/utils";

export default class OwnedGames extends Component {
    _isMounted = false;
    state = {
        games: null,
        game_count: null,
        loading: true,
    };
    steam = new steamService();

    componentDidMount(){
        this._isMounted = true;
        this.updateGamesList();
    }

    updateGamesList() {
        const { steamid } = this.props;
        if (!steamid) {
            return;
        }
        this.setState({
            loading: true
        });

        this.steam.getOwnedGames(steamid, 1)
            .then((data) => {
                if (this._isMounted) {
                    const games = data.response.games,
                        game_count = data.response.game_count;
                    this.setState({
                        loading: false,
                        games: games,
                        game_count: game_count
                    });
                }
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.steamid !== prevProps.steamid) {
            this.updateGamesList();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        const {games, game_count, loading} = this.state;

        if (loading) {
            return <Loader/>
        }

        let gamesList = [];
        if (Array.isArray(games)) {
            for (let i in games) {
                gamesList.push(<Game game={games[i]} key={games[i]['appid']} />)
                if (i > 18) {
                    break;
                }
            }
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    {gamesList}
                </div>
            </div>
        );
    };
}

const Game = ({game}) => {
    const utils = new Utils(),
        playTimeForever = utils.minutesToHour(game.playtime_forever);
    const imgUrl = "http://media.steampowered.com/steamcommunity/public/images/apps/" + game.appid + "/" + game.img_icon_url + ".jpg";
    return (
        <div>
            <div className="row">
                <div className="col-auto"><img src={imgUrl} alt="game icon" /></div>
                <div className="col recently-game-info">
                    <span className="recently-game-info-line"><a href="#">{game.name}</a><br /></span>
                    <span className="recently-game-info-line"><b>Play time forever:</b> {playTimeForever}</span>
                </div>
            </div>
        </div>
    );
};