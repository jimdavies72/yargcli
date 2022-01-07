const yargs = require("yargs");

const {
  addMovie,
  listMovies,
  updateMovie,
  deleteMovie,
  listSingleMovie,
} = require("./utils/index.js");
const fs = require("fs");
//const { ConnectionCheckedInEvent } = require("mongodb");
const connection = require("./db/connection");

const command = yargs.argv._[0];
//console.log(yargs.argv);

const app = async (args) => {
  try {
    if (command === "add") {
      await addMovie({ title: args.title, actor: args.actor });
    } else if (command === "list") {
      await listMovies();
    } else if (command === "single") {
      await listSingleMovie(args.title);
    } else if (command === "update") {
      // node src/app.js "update" --search="alien" --title="aliens"
      await updateMovie(args);
    } else if (command === "delete") {
      await deleteMovie(args.title);
    }
  } catch (error) {
    console.log(error);
  }
};

app(yargs.argv);
