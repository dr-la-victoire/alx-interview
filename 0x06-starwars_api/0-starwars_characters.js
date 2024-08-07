#!/usr/bin/node
const { rejects } = require("assert");
const request = require("request");

const id = process.argv[2];

function getFilmData(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode === 200) {
        resolve(JSON.parse(body));
      }
    });
  });
}

function getCharacterNames(url) {
  return getFilmData(url).then((data) => data.name);
}

getFilmData(`https://swapi-api.alx-tools.com/api/films/${id}`)
  .then((data) => {
    const characters = data.characters;
    return Promise.all(characters.map(getCharacterNames));
  })
  .then((characterName) => {
    characterName.forEach((name) => console.log(name));
  })
  .catch((error) => {
    console.error("Error:", error);
  });

/*request(
  `https://swapi-api.alx-tools.com/api/films/${id}`,
  function (error, response, body) {
    if (error) {
      console.error("Error: ", error);
    } else if (response.statusCode === 200) {
      const data = JSON.parse(body);
      const characters = data.characters;
      characters.forEach((character) => {
        request(character, function (error, response, body) {
          if (error) {
            console.error("Error:", error);
          } else if (response.statusCode === 200) {
            const theData = JSON.parse(body);
            const characterName = theData.name;
            console.log(characterName);
          }
        });
      });
    }
  }
);*/
