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
