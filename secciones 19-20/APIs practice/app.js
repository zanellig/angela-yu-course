"use strict";

const express = require("express");

const https = require("node:https");
const { urlToHttpOptions } = require("node:url");

const app = express();
const port = 3000;
const root = __dirname;

const apiData = require("./apiData");
const apiKey = apiData.apiKey;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${root}/index.html`);
});

app.post("/", (req, res) => {
  const inputCityName = req.body.cityName;
  let units;
  units = `metric`;
  let lang = req.body.language;

  /*
	let id;
	function getIdFromJson(arr) {
		[
			{ id: 2643741, name: 'London' },
			{ id: 3433955, name: 'Buenos Aires' },
		].forEach(element => {
			if (element.name !== inputCityName) {
				return;
			} else {
				id = element.id;
			}
		});
	}
	getIdFromJson();
	*/

  const url = `https://api.openweathermap.org/data/2.5/weather?&q=${inputCityName}&units=${units}&lang=${lang}&appid=${apiKey}`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const code = weatherData.cod;
      console.log(code);
      if (code >= 200 && code < 300) {
        const temp = Math.round(weatherData.main.temp);
        const country = weatherData.sys.country;
        const city = weatherData.name;
        const feelsLikeTemp = Math.round(weatherData.main.feels_like);
        const weatherDescription = weatherData.weather[0].description;
        const iconId = weatherData.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
        if (lang === `en`) {
          res.write(
            `<h1>
							The current temperature in ${city}, ${country} is ${temp} degrees Celsius and the feels like temperature is ${feelsLikeTemp} degrees Celsius.
							</h1>`
          );
          res.write(`<h2>The weather is currently ${weatherDescription}.</h2>`);
        } else if (lang === `es`) {
          res.write(
            `<h1>
							La temperatura actual en ${city}, ${country} es de ${temp} grados Celsius y la sensacion termica es de ${feelsLikeTemp} grados Celsius.
							</h1>`
          );
          res.write(`<h2>El clima es actualmente ${weatherDescription}.</h2>`);
        }
        res.write(`<img src="${iconUrl}"/>`);
        res.send();
      } else if (code == 404) {
        res.write(`<h1>Invalid city name. Please try again...</h1>`);
        res.send();
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
