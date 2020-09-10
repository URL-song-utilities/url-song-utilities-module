<h1 align="center">Welcome to url-song-utilities 👋</h1>

A module to get information about music titles and even be able to download them !

## 🏓 Installation

```sh
npm i url-song-utilities
```

## ✨ Utilisation

Available methods :

```
#Search a music
<module>.searchSong('<song>')

#Find the type of an url
<module>.sourceUrl('<URL>')

#Search for music lyrics
<module>.getLyrics('<song>')

#Download a music with a YouTube url
<module>.download('<URL>')
```

Examples :

- For the following examples we will define player as follows :

```js
const player = require('url-song-utilities');
```

- Search a music

```js
//The bot will try to get information about the music
await player.searchSong('PETIT BISCUIT - Sunset Lover').then(song => {
    //It returns the information to the console
    console.log(song);
}).catch(err => {
    //If the module did not find the music it returns a error
    console.log('No music found !');
})
```

- Find the type of an url (we will use a YouTube URL for the example)

```js
//The bot will try to find the source of the provided url (YouTube or Spotify)
await player.sourceUrl('https://youtu.be/k2qgadSvNyU').then(data => {
    //If the module returns 'undefined', the source is not found
    if (!data) return console.log('Cannot determine the source !');
    //If the module finds the source
    console.log(data);
})
```

- Search for music lyrics

```js
//The bot will try to find the lyrics of the music
await player.getLyrics('Luis Fonsi - Despacito').then(lyrics => {
    //If the module returns 'undefined' it means that the module did not find any lyrics
    if (!lyrics) return console.log('I did not find any lyrics !');
    //If the module finds lyrics
    console.log(lyrics);
})
```

- Download a music with a URL

```js
//The bot will need the fs module function to save the file
const { createWriteStream } = require("fs");
//The bot will search for the music
await player.download('https://youtu.be/nceqQyqIa5o').then(stream => {
    //The bot will record the music under './song.mp3'
    //You can use other formats such as (mp3, mp4...)
    stream.pipe(createWriteStream('song.mp3'));
})
```

- Result of a search (example : TROLLZ - 6ix9ine with Nicki Minaj)

```
{
  title: 'TROLLZ - 6ix9ine with Nicki Minaj (Official Lyric Video)',
  id: '-wts5viH28E',
  url: 'https://www.youtube.com/watch?v=-wts5viH28E',
  channel: {
    name: 'Tekashi 6ix9ine',
    url: 'https://www.youtube.com/channel/UCF6jRAgCbSanHolKt0Vt6Qw'
  },
  thumbnail: 'https://i.ytimg.com/vi/-wts5viH28E/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDDvxmF9oWa7wca5PXqcYcDvJi-_w',
  duration: 204,
  source: 'YouTube'
}
```

## 🎉 Bonus

- Download event

```js
//The bot will need the fs module function to save the file
const { createWriteStream } = require("fs");
//The bot will search for the music
await player.download('https://youtu.be/nceqQyqIa5o').then(stream => {
    //The bot will record the music under './song.mp3'
    //You can use other formats such as (mp3, mp4...)
    stream.pipe(createWriteStream('song.mp3')).on('finish', () => {
        //When the file will be downloaded the bot will send back a message
        console.log('Music downloaded !');
    })
})
```

- Search and download

```js
//The bot will need the fs module function to save the file
const { createWriteStream } = require("fs");
//The bot will search for the music (on Spotify for example)
await player.searchSong('https://open.spotify.com/track/22LAwLoDA5b4AaGSkg6bKW').then(async song => {
    await player.download(song.url).then(stream => {
        //The bot will download the file with the name it has found
        stream.pipe(createWriteStream(song.title + '.mp3'));
    })
}).catch(err => {
    //If the module did not find the music it returns a error
    return console.log('No music found !');
})
```

## 👤 Developers

This project was designed by Zerio & Simon.

## 🤝 Contributing

Contributions, issues and feature requests are welcome !<br />Feel free to check [issues page](https://github.com/Videos-Downloader/url-song-utilities/issues).

## 📝 License

Copyright © 2020 [Zerio & Simon](https://github.com/<projet>).<br />

Give a ⭐️ (on the Github project) if this project helped you !