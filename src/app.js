const yargs = require("yargs");
const {
  addMovie,
  listMovies,
  updateMovie,
  deleteMovie,
  listSingleMovie,
} = require("./utils/index.js");
const fs = require("fs");
const { ConnectionCheckedInEvent } = require("mongodb");
const connection = require("./db/connection");

const command = process.argv[2];

const app = async (args) => {
  try {
    if (command === "add") {
      const movieObj = {
        title: args.title,
        actor: args.actor,
      };
      await connection(addMovie, movieObj);
    } else if (command === "list") {
      await connection(listMovies);
    } else if (command === "single") {
      await connection(listSingleMovie, args.title);
    } else if (command === "update") {
      // node src/app.js "update" --search="alient" --title="aliens"
      await connection(updateMovie, args);
    } else if (command === "delete") {
      await connection(deleteMovie, args.title);
    }
  } catch (error) {
    console.log(error);
  }
};

app(yargs.argv);
