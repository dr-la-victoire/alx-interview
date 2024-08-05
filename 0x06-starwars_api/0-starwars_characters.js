#!/usr/bin/node
const request = require('request');

const id = process.argv[2];

request(`https://swapi-api.alx-tools.com/api/films/${id}`, function (error, response, body) {
  if (error) {
    console.error('Error: ', error);
  } else if (response.statusCode === 200) {
      const data = JSON.parse(body);
      const characters = data.characters;
      characters.forEach((character) => {
        request(character, function(error, response, body) {
          if (error) {
            console.error('Error:', error);
	  } else if (response.statusCode === 200) {
              const theData = JSON.parse(body);
	      const characterName = theData.name;
	      console.log(characterName);
	  }
	});
      });
  }
});
