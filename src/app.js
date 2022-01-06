const yargs = require("yargs");
const {
  addMovie,
  listMovies,
  updateMovie,
  deleteMovie,
  listSingleMovie,
} = require("./utils/index.js");
const fs = require("fs");

const app = () => {
  try {
    let movieArr;
    try {
      movieArr = JSON.parse(fs.readFileSync("./storage.json"));
    } catch (error) {
      movieArr = [];
    }

    try {
      if (process.argv[2] === "add") {
        addMovie(movieArr, {
          title: yargs.argv.title,
          actor: yargs.argv.actor,
        });
        //console.log(yargs.argv.title);
      } else if (process.argv[2] === "list") {
        listMovies();
      } else if (process.argv[2] === "update") {
        // node src/app.js "update" --search="alient" --title="aliens"
        updateMovie(yargs.argv);
      } else if (process.argv[2] === "delete") {
        deleteMovie(yargs.argv.title);
      } else if (process.argv[2] === "single") {
        listSingleMovie(yargs.argv.title);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

app();
