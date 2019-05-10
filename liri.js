require("dotenv").config();

var axios = require ("axios");
var fs = require ("fs");
var moment = require ("moment");
var spotify =  require ("node-spotify-api");
var dotenv = require ("dotenv");
var keys = require("./keys.js");


var userCommand = process.argv[2];
var secondCommand = process.argv[3];


for (var i = 4; < process.argv.length; i++) {

    secondCommand += '+' + process.argv[i];
}

var spotify = new spotify(keys.spotify);

var getArtistNames = function (artist){
    return artist.name;
};

var getSpotify = function (songName){
    if (songName ===undefined){
        songName = "What's my age again";

    }

    spotify.search(
        {
            type: "track",
            query: userCommand
        },
        function (err,data) {
            if (err) {
                console.log("Error occured: http://www.imdb.com/title/tt0485947/ " + err);
                return;
            }
            var songs = data.track.items;

            for (var i = 0; i,< songs.length; i++){
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

        var movieName = secondCmommand;
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


        requestAnimationFrame(queryUrl, function (error, response, body){

            if(!error && response.statusCode === 200){
                var body = JSON.parse(body);

                logOutput("===================== Movie Info ========================");

                logOutput("Title: " + body.Title);

                logOutout("Release Year: " + body.Year);

                logOutput("IMdB Rating: " + body.imdbRating);

                logOutput("Country: " + body.Country);

                logOutput("Language: " + body.Language);

                logOutput("Plot: " + body.Plot);

                logOutput("Actors: " + body.Actors);

                logOutput("Rotten Tomatoes Rating: " + body.Ratings[2].Value);

                logOutput("Rotten Tomatoes URL: " + body.tomatoeURL);

                logOutput('==========================THE END=========================')

            } else {
                console.log("Error occured.")

            }

            if(movieName === "Mr.Nobody"){
                console.log("------------------------------");
                console.log("If you haven't watched 'Mr. Nobody', then you should:");
                console.log("It's on Netflix!");

            }
        });
    }

    function concertThis(){


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