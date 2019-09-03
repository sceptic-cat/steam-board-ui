export default class steamService {
    _apiBase = 'http://localhost:3001';

    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `received ${res.status}`);
        }
        return await res.json();
    }

    getNewsForApp  = async (appid, count = 5, maxlength = 300) => {
        return await this.getResource(`/get-news-for-app/${appid}/${count}/${maxlength}`);
    };

    getGlobalAchievementPercentagesForApp  = async (gameid) => {
        return await this.getResource(`/et-global-achievement-percentages-for-app/${gameid}`);
    };

    getPlayerSummaries = async (id) => {
        return await this.getResource(`/get-player-summaries/${id}`);
    };

    getFriendList = async (steamid, relationship = 'friend') => {
        return await this.getResource(`/get-friend-list/${steamid}/${relationship}`);
    };

    getPlayerAchievements = async (appid, steamid) => {
        return await this.getResource(`/get-player-achievements/${appid}/${steamid}`);
    };

    getUserStatsForGame = async (appid, steamid) => {
        return await this.getResource(`/get-user-stats-for-game/${appid}/${steamid}`);
    };

    getOwnedGames = async (steamid, includeAppinfo = 0) => {
        return await this.getResource(`/get-owned-games/${steamid}/${includeAppinfo}`);
    };

    getRecentlyPlayedGames = async (id, count = 5) => {
        return await this.getResource(`/recently-played-games/${id}/${count}`);
    };

    getSchemaForGame = async (appid) => {
        return await this.getResource(`/schema-for-game/${appid}`);
    };
}