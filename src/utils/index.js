const Movie = require("../models/models.js");
const mongoose = require("mongoose");

const addMovie = async (movieObj) => {
  try {
    const newMovie = new Movie(movieObj);
    await newMovie
      .save()
      .then(
        displayInfo(
          `${newMovie.title} was successfully inserted into the database.`
        )
      );
  } catch (error) {
    displayInfo(error.message);
  }
};

const listMovies = async () => {
  try {
    const movieArr = await Movie.find({});

    if (movieArr.length >= 1) {
      displayInfo(movieArr);
    } else {
      displayInfo("No movies were found in the database.");
    }
  } catch (error) {
    displayInfo(error.message);
  }
};

const listSingleMovie = async (title) => {
  try {
    const query = { title: title };
    const movieArr = await Movie.find(query);

    if (movieArr.length >= 1) {
      displayInfo(movieArr);
    } else {
      displayInfo(`${title} was not found in the database.`);
    }
  } catch (error) {
    displayInfo(error.message);
  }
};

const updateMovie = async (cliArguments) => {
  try {
    const filter = { title: cliArguments.search };
    let update = {};

    cliArguments.title && (update["title"] = cliArguments.title);
    cliArguments.actor && (update["actor"] = cliArguments.actor);

    let options = { new: false };

    result = await Movie.updateOne(filter, update, options);

    if (result.matchedCount >= 1) {
      displayInfo(
        `${cliArguments.search} was successfully updated to ${cliArguments.title} - ${cliArguments.actor}`
      );
    } else {
      displayInfo(
        `${cliArguments.search} was not found and therefore not updated.`
      );
    }
  } catch (error) {
    displayInfo(error.message);
  }
};

const deleteMovie = async (title) => {
  try {
    result = await Movie.deleteOne({ title: title });

    if (result.deletedCount === 0) {
      displayInfo(`${title} was not found in the database.`);
    } else {
      displayInfo(`${title} was successfully deleted. `);
    }
  } catch (error) {
    displayInfo(error.message);
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
