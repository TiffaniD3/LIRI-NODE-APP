require("dotenv").config();
let axios = require("axios");
let moment = require("moment");
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.Spotify);
let figlet = require("figlet");
let chalk = require("chalk");
let fs = require("fs");
let log = console.log;

let command = process.argv[2];
let param = process.argv[3];

// App commands
function heyLiri() {
    switch (command) {

        case "spotify-this-song":
            spotifySong(param);
            break;

        case "movie-this":
            omdb(param);
            break;

        case "concert-this":
            bandsInTown(param);
            break;

        case "do-what-it-says":
            doIt();
            break;

        default:
            log("LIRI is very particular. Please ensure you are using the proper command.");

    };
};

// Spotify function
function spotifySong(param) {

    let songSearch;
    if (param === undefined) {
        songSearch = "Ace of Base The Sign";
    } else {
        songSearch = param;
    };

    // Spotify Header
    let figFont = "Spotify"
    figlet(figFont, function (err, data) {
        if (err) {
            log(err);
            return;
        }
        log(chalk.green(data));
        log(chalk.green("===================================="));
    });

    // Data pulled from Spotify
    spotify.search({
            type: "track",
            query: songSearch
        })
        .then(function (response) {
            let data = response.tracks.items;
            for (let i = 0; i < data.length; i++) {
                log("Artist(s): ", data[i].artists[0].name);
                log("Song: ", data[i].name);
                log("Album: ", data[i].album.name);
                log("Preview: ", data[i].preview_url);
                log(chalk.green("===================================="));
            }
        })
        .catch(function (err) {

            log("I'm sorry, I wasn't able to find that. Here's why: " + err);
        });
};

// OMDB Function
function omdb(param) {

    let movieSearch;
    if (param === undefined) {
        movieSearch = "Mr. Nobody";
    } else {
        movieSearch = param;
    };

    // OMDB Header
    let figFont = "OMDB"
    figlet(figFont, function (err, data) {
        if (err) {
            log(err);
            return;
        }
        log(chalk.red(data));
        log(chalk.red("==========================="));
    });

    // Data pulled from OMDB
    let queryURL = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
        .then(function (response) {
            log("Movie Title: " + response.data.Title);
            log("Year Released: " + response.data.Year);
            log("IMDB Rating: " + response.data.imdbRating);
            log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
            log("Country of Origin: " + response.data.Country);
            log("Language: " + response.data.Language);
            log("Plot: " + response.data.Plot);
            log("Actors: " + response.data.Actors);
            log(chalk.red("===================================="));
        })
        .catch(function (error) {
            log("I'm sorry, I wasn't able to find that. Here's why: " + error);
        });

};

// BandsInTown Function
function bandsInTown(param) {

    let bandSearch;
    if (param === undefined) {
        bandSearch = "Rob Zombie";
    } else {
        bandSearch = param;
    }

    // BandsInTown Header
    let figFont = "BandsInTown"
    figlet(figFont, function (err, data) {
        if (err) {
            log(err);
            return;
        }
        log(chalk.blue(data));
        log(chalk.blue("=============================================================="));
    });

    // Data pulled from BandsInTown
    let queryURL = "https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                log("Artist: " + bandSearch);
                log("Lineup: " + response.data[i].lineup);
                log("Venue: " + response.data[i].venue.name);
                log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                log(chalk.blue("===================================="));

            }
        })
        .catch(function (error) {
            log("I'm sorry, I wasn't able to find that. Here's why: " + error);
        });

};

// Do-What-it-says function is not working
function doIt() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            log("I'm sorry. I had trouble reading that. Here's why: " + error);
        };

        let dataArr = data.split(", ");
        param = dataArr[1];

        if (dataArr[0] === "spotify-this-song") {
            spotifySong(param);
        };

    });
};



heyLiri();