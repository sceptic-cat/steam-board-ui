export default class steamService {
   // _apiBase = 'http://api.steampowered.com';
    _apiBase = 'http://localhost:3001';
    _apiKey = '';

    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `received ${res.status}`);
        }
        return await res.json();
    }

    getPlayerSummaries = async (id) => {
        const playerSummaries = await this.getResource(`/get-player-summaries/${id}`);
        return playerSummaries;
    };
}