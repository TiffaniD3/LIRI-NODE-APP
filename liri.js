require("dotenv").config();
let axios = require("axios");
const fs = require("fs");
const moment = require("moment");
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.Spotify);
let figgy = require("figlet");
let chalk = require("chalk");
let log = console.log;

let command = process.argv[2];
let param = process.argv[3];

function switchCase() {
    switch (command) {

        case "spotify-this-song":
        spoitfySong(param);
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

    }
};

// Spotify function
let asciiFig = "Spotify"

function spoitfySong(param) {

    var songSearch;
    if (param === undefined) {
        songSearch = "Ace of Base The Sign";
    } else {
        songSearch = param;
    };

    figgy(asciiFig, function(err, data){
        if (err){
            log(err);
            return;
        }
        log(chalk.green(data));
    });

    spotify.search({ type: "track", query: songSearch})

    .then(function(response) {
        var data = response.tracks.items;
        log("This is a test", data[1].album.name);
         for (let i = 0; i < data.length; i++) {
        //     log("NUMBER: ", i + 1, "/", data.length);
        //     log("Artist(s): ", + data[i].artists[0].name);
        //     log("Song Name: ", + data[i].name);
        //     log("Preview Song: ", + data[i].preview_url);
            log("Album: ", + data[i].album.name);
        //     log("========================")
        }
        
    })
    .catch(function(err){

        log("I'm sorry, I wasn't able to find that. Here's why: " + err);
    })
}

switchCase();