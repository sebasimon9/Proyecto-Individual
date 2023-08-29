const axios = require("axios");
const { Country } = require('../db');
const apiUrl = "http://localhost:5000/countries";


const formatCountryData = (countryData) => {
  return {
    id: countryData.cca3,
    name: countryData.name.common || "no name",
    flags: countryData.flags.png|| "no flags",
    continent: countryData.region || "no continent",
    capital: countryData.capital?.[0] || "No capital",
    subregion: countryData.subregion || "no subregion",
    area: countryData.area || 0,
    population: countryData.population || 0,
  };
};

const loadDataBase = async () => {
  try {
    const response = await axios.get(apiUrl);
    const countriesData = response.data;
    const countries = countriesData.map((countryData) =>
      formatCountryData(countryData)
    );

    const existingCountries = await Country.findAll();

    const newCountries = countries.filter((country) => {
      return !existingCountries.find(
        (existingCountry) => existingCountry.id === country.id
      );
    });
    newCountries.forEach(element => {
      Country.create(element)
    });

    console.log(`${newCountries.length} countries saved to database`);
  } catch (error) {
    console.error("Error saving countries to database:", error);
  }
};
module.exports = {
    loadDataBase,
};