const addMovie = async (collection, movieObj) => {
  try {
    await collection.insertOne(movieObj);
    displayInfo(
      `${movieObj.title} was successfully inserted into the database.`
    );
  } catch (error) {
    displayInfo(error.message);
  }
};

const listMovies = async (collection) => {
  try {
    const movieArr = await collection.find({}).toArray();
    if (movieArr.length >= 1) {
      displayInfo(movieArr);
    } else {
      displayInfo("No movies were found in the database.");
    }
  } catch (error) {
    displayInfo(error.message);
  }
};

const listSingleMovie = async (collection, title) => {
  try {
    const query = { title: title };
    const movieArr = await collection.find(query).toArray();

    if (movieArr.length >= 1) {
      displayInfo(movieArr);
    } else {
      displayInfo("Movie was not found in the database.");
    }
  } catch (error) {
    displayInfo(error.message);
  }
};

const updateMovie = async (collection, cliArguments) => {
  try {
    const filter = { title: cliArguments.search };
    let update = {};

    cliArguments.title && (update["title"] = cliArguments.title);
    cliArguments.actor && (update["actor"] = cliArguments.actor);

    const result = await collection.updateOne(filter, { $set: update });
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

const deleteMovie = async (collection, title) => {
  try {
    const query = { title: title };
    const result = await collection.deleteOne(query);
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
