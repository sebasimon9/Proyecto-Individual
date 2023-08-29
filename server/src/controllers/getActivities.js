const { Activity, Country } = require("../db");
const { Op } = require("sequelize"); 

const getActivity = async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: {
              model: Country,
              attributes: ["name"],
              through: { attributes: [] },
            },
          });
          res.status(200).send(activities)
    } catch (error) {
        res.status(400).send(error.message)
    }
};

const postActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  if (!name,  !difficulty,  !season) {
    return res.status(400).send("Name, difficulty, and season are required");
  }
  try {
    const newActivity = await createActivity(name, difficulty, duration, season, countries);
    res.status(201).send("Activity created successfully");
  } catch (error) {
    if (
      error.message === "The activity already exists" ||
      error.message === "The activity must have at least one country"
    ) {
      res.status(409).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};
const createActivity = async (
  name,
  difficulty,
  duration,
  season,
  countries
) => {
  const existingActivity = await Activity.findOne({ where: { name } });
  if (existingActivity) {
    throw new Error("The activity already exists");
  }
  if (!countries || countries.length === 0) {
    throw new Error("The activity must have at least one country");
  }
  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });
  await newActivity.setCountries(countries);
  return newActivity;
}
  

module.exports = {
    getActivity,
    postActivity,
};