const fs = require("fs");
const filePath = "./storage.json";

const addMovie = (movieArr, movieObj) => {
  //console.log(movieObj);
  try {
    movieArr.push(movieObj);
    const stringObj = JSON.stringify(movieArr);
    fs.writeFileSync(filePath, stringObj);
  } catch (error) {
    displayInfo(error.message);
  }
};

const listMovies = () => {
  try {
    displayInfo(JSON.parse(fs.readFileSync(filePath)));
  } catch (error) {
    displayInfo("There are no movies to list.");
  }
};

const listSingleMovie = (title) => {
  try {
    const movieArr = JSON.parse(fs.readFileSync(filePath));
    const movieObj = movieArr.find((movieArr) => movieArr.title === title);

    if (movieObj) {
      displayInfo(movieObj);
    } else {
      displayInfo("Movie was not found in database.");
    }
  } catch (error) {
    displayInfo(error.message);
  }
};

const updateMovie = (cliArguments) => {
  try {
    const movieArr = JSON.parse(fs.readFileSync(filePath));
    const movieObj = movieArr.find((obj) => obj.title === cliArguments.search);

    cliArguments.title && (movieObj.title = cliArguments.title);
    cliArguments.actor && (movieObj.actor = cliArguments.actor);

    const stringObj = JSON.stringify(movieArr);
    fs.writeFileSync(filePath, stringObj);
  } catch (error) {
    // ENOENT
    if (error.code === "ENOENT") {
      displayInfo("Movie database was not found.");
    } else {
      displayInfo(
        "Movie was not found in the database. No update has been made."
      );
    }
  }
};

const deleteMovie = (title) => {
  try {
    const movieArr = JSON.parse(fs.readFileSync(filePath));
    const index = movieArr.findIndex((obj) => obj.title === title);

    if (index !== -1) {
      movieArr.splice(index, 1);
      const stringObj = JSON.stringify(movieArr);
      fs.writeFileSync(filePath, stringObj);
    } else {
      displayInfo("Movie was not found in the database.");
    }
  } catch (error) {
    // ENOENT
    if (error.code === "ENOENT") {
      displayInfo("Movie database was not found.");
    } else {
      displayInfo(error.message);
    }
  }
};

const displayInfo = (message, clear = true) => {
  if (clear === true) {
    console.clear();
  }
  console.log(message);
  console.log("\n");
};

module.exports = {
  addMovie,
  listMovies,
  updateMovie,
  deleteMovie,
  listSingleMovie,
};
