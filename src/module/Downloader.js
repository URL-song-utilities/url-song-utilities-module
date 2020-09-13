const Spotify = require("spotify-url-info");
const ScrapeYt = require("scrape-yt");
const fetch = require('node-fetch');
const ytdl = require('ytdl-core');

class DOWNLOADER {

    /**
     * getSong
     * @param {String} search It can be a youtube/spotify url, a youtube code, a youtube title or simply a search term
     * @returns {Object} An object that contains information about the sound
     */
    static async searchSong(search) {

        if (typeof search !== "string") throw new Error('Parameter \'search\' must be a string !');

        switch (this.sourceUrl(search)) {

            case 'YouTube': {

                const results = (await ytdl.getBasicInfo(search)).videoDetails;
                const data = {
                    title: results.title,
                    id: results.videoId,
                    url: results.video_url,
                    channel: {
                        name: results.author.name,
                        url: results.author.channel_url,
                        avatar: results.author.avatar
                    },
                    thumbnail: results.thumbnail.thumbnails[results.thumbnail.thumbnails.length - 1].url,
                    duration: results.lengthSeconds,
                    source: 'YouTube'
                }
                return data;
            }

            case 'Spotify': {
                const spotifyData = await Spotify.getPreview(search).catch(e => { });
                const infos = await ScrapeYt.search(`${spotifyData.title} - ${spotifyData.artist}`, {
                    type: "video",
                    limit: 1
                });
                const results = (await ytdl.getBasicInfo(infos[0].id)).videoDetails;

                const data = {
                    title: spotifyData.title,
                    id: results.videoId,
                    url: results.video_url,
                    channel: {
                        name: results.author.name,
                        url: results.author.channel_url,
                        avatar: results.author.avatar
                    },
                    thumbnail: spotifyData.image,
                    duration: results.lengthSeconds,
                    source: 'Spotify'
                }
                return data;
            }

            default: {
                const infos = await ScrapeYt.search(search, {
                    type: "video",
                    limit: 1
                });
                const results = (await ytdl.getBasicInfo(infos[0].id)).videoDetails;

                const data = {
                    title: results.title,
                    id: results.videoId,
                    url: results.video_url,
                    channel: {
                        name: results.author.name,
                        url: results.author.channel_url,
                        avatar: results.author.avatar
                    },
                    thumbnail: results.thumbnail.thumbnails[results.thumbnail.thumbnails.length - 1].url,
                    duration: results.lengthSeconds,
                    source: 'YouTube'
                }
                return data;
            }
        }

    }

    /**
     * sourceUrl
     * @param {String} url An url
     * @returns {String} A string containing the source website of the link
     */
    static sourceUrl(url) {

        if (typeof url !== "string") throw new Error('Parameter \'url\' must be a string !');

        switch (true) {

            case ytdl.validateURL(url):
                return 'YouTube';
                break;

            case /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/.test(url):
                return 'Spotify';
                break;

            case /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/.test(url):
                return 'SoundCloud';
                break;

            default:
                return undefined;
                break;

        }

    }

    /**
     * getLyrics
     * @param {String} song Title and author of a any song. like 'COPYCAT Billie Eilish' for example
     * @returns {String} Lyrics of the song
     */
    static async getLyrics(song) {

        if (!song) throw new Error('No song provided !');
        if (typeof song !== "string") throw new Error('Parameter \'song\' must be a string !');

        try {

            //Fetch
            let res = await fetch(`https://some-random-api.ml/lyrics/?title=${encodeURIComponent(song)}`);
            res = await res.json();

            //If the module does not find lyrics
            if (res.lyrics === 0 || !res.lyrics) return undefined;

            //Send lyrics
            return res.lyrics;

        } catch (e) {

            //If there are no arguments
            return undefined;

        }

    }

    /**
     * download
     * @param {String} song Song object or youtube song url
     * @returns {String} Stream YTDL
     */
    static async download(song, options) {

        if (!song) throw new Error('No song provided !');
        if (typeof song === "object" && song.url) song = song.url
        else if (typeof song !== "string") throw new Error('Parameter \'song\' must be a string or a song object !');

        const format = options && typeof options === 'object' && options.format && typeof options.format === 'string' ? options.format : 'mp4';

        return ytdl(song, { format: format });

    }

}

module.exports = DOWNLOADER;
