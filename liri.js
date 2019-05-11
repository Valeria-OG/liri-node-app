require("dotenv").config();

var axios = require ("axios");
var fs = require ("fs");
var moment = require ("moment");
var spotify =  require ("node-spotify-api");
var dotenv = require ("dotenv");
var keys = require("./keys.js");
var request = require("request");
const chalk = require("chalk");


var userCommand = process.argv[2];
var secondCommand = process.argv[3];
var media_array = process.argv.slice(3);
var media = media_array.join(" ");


for (var i = 4; i < process.argv.length; i++) { 

    secondCommand += '+' + process.argv[i];
}

var spotify = new spotify(keys.spotify);

var getArtistNames = function (artist){
    return artist.name;
};

var getSpotify = function (songName){
    if (songName === ""){
        songName = "What's my age again";

    }

    spotify.search(
        {
            type: "track",
            query: userCommand
        },
        function (err,data) {
            if (err) {
                console.log("Error occured:" + err);
                return;
            }
            var songs = data.track.items;

            for (var i = 0; i < songs.length; i++){
                console.log(i);

                console.log("artist(s):" + songs[i].artist.map(getArtistName));

                console.log("song name: " + songs[i].name);

                console.log("preview song: " + songs[i].preview_url);

                console.log("album: " + songs[i].album.name);

                console.log("-----------------------------------------");
            }
        }
    );
};

function mySwitch(userCommand) {


    switch (userCommand){

        case "spotify-this-song":
             getSpotify();
             break;

        case "movie-this":
              getMovie();
              break;
              
        case "dp-what-it-says":
              doWhat();
              break;
              
        case "concert-this":
              concertThis();
              break;      
    }

    function getMovie(){

        var movieName = secondCommand;
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


        request(queryUrl, function (error, response, body){

            if(!error && response.statusCode === 200){
                var body = JSON.parse(body);

                console.log("===================== Movie Info ========================");

                console.log("Title: " + body.Title);

                console.log("Release Year: " + body.Year);

                console.log("IMdB Rating: " + body.imdbRating);

                console.log("Country: " + body.Country);

                console.log("Language: " + body.Language);

                console.log("Plot: " + body.Plot);

                console.log("Actors: " + body.Actors);

                console.log("Rotten Tomatoes Rating: " + body.Ratings[2].Value);

                console.log("Rotten Tomatoes URL: " + body.tomatoeURL);

                console.log('==========================THE END=========================')

            } else {
                console.log("Error occured.")

            }

            if(movieName === "Mr.Nobody"){
                console.log("------------------------------");
                console.log("If you haven't watched 'Mr. Nobody', then you should:http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");

            }
        });
    }

    function concertThis(){

        if (media == "") {

            media = "Brockhampton"
     
        }
     
        request("https://rest.bandsintown.com/artists/" + media + "/events?app_id=codingbootcamp", function (error, response, data) {
     
            try {
     
                var response = JSON.parse(data)
     
                if (response.length != 0) {
     
                    console.log(chalk.green(`Upcoming concerts for ${media} include:` ))
     
                    response.forEach(function (element) {
     
                        console.log(chalk.cyan("Venue name: " + element.venue.name));
     
                        if (element.venue.country == "United States") {
     
                            console.log("City: " + element.venue.city + ", " + element.venue.region);
     
                        } else {
     
                            console.log("City: " + element.venue.city + ", " + element.venue.country);
     
                        }
     
                        console.log("Date: " + moment(element.datetime).format('MM/DD/YYYY'));
     
                        console.log();
     
                    })
     
                } else {
     
                    console.log(chalk.red("No concerts found."));
     
                }
     
            }
     
            catch (error) {
     
                console.log(chalk.red("No concerts found."));
     
            }
     
        });  


    }

    function doWhat(){
        fs.readFile("random.txt", "utf8", function (error, data){
            if (!error);
            console.log(data.toString());

            var cmds = data.toString().split(',');
        });
    }
}

mySwitch(userCommand);