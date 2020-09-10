const player = require("../src/index");

//The bot will need the fs module function to save the file
const { createWriteStream } = require("fs");
//The bot will search for the music (on Spotify for example)
player.searchSong('https://youtu.be/YBHQbu5rbdQ').then(async song => {
    await player.download(song.url).then(stream => {
        //The bot will download the file with the name it has found
        stream.pipe(createWriteStream(song.title + '.mp3')).on('finish', () => {
            //When the file will be downloaded the bot will send back a message
            console.log('Music downloaded !');
        })
    })
}).catch(err => {
    //If the module did not find the music it returns a error
    return console.log('No music found !');
})