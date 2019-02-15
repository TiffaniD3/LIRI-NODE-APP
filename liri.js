require("dotenv").config();
let axios = require("axios");
let moment = require("moment");
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.Spotify);
let figlet = require("figlet");
let chalk = require("chalk");
let log = console.log;

let command = process.argv[2];
let param = process.argv[3];

// App commands
function heyLiri() {
    switch (command) {

        case "spotify-this-song":
        spotifySong(param);
        break;

        case "concert-this":
        bandsInTown(param);
        break;

        case "moive-this":
        omdb(param);
        break;

        case "do-what-it-says":
        getRandom();
        break;

        default:
        log("LIRI is very particular. Please ensure you are using the proper commands.");

    };
};

// Spotify function
let asciiFig = "Spotify"

function spotifySong(param) {

    var songSearch;
    if (param === undefined) {
        songSearch = "Ace of Base The Sign";
    } else {
        songSearch = param;
    };

    // Spotify Header
    figlet(asciiFig, function(err, data){
        if (err){
            log(err);
            return;
        }
        log(chalk.green(data));
        log(chalk.green("===================================="));
    });

    // Data pulled from Spotify
    spotify.search({ type: "track", query: songSearch})
    .then(function(response) {
        let data = response.tracks.items;
        for (let i = 0; i < data.length; i++){
            log("Artist(s): ",  data[i].artists[0].name);
            log("Song: ",  data[i].name);
            log("Album: ",  data[i].album.name);
            log("Preview: ",  data[i].preview_url);
            log(chalk.green("===================================="));
        }
    })
    .catch(function(err){

        log("I'm sorry, I wasn't able to find that. Here's why: " + err);
    });
};



heyLiri();