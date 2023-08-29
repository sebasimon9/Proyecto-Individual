const { Country, Activity }= require("../db");
const { Op } = require("sequelize"); 
const {loadDataBase} = require("./loadDataBase");

const getAllCountries = async (req, res) => {
  const {name} = req.query
  console.log(name);
        try {
          if (name){
            const countryName = await getCountries(name);
       return res.status(200).send(countryName);
          }
          const countries = await Country.findAll({
            include: {
              model: Activity,
              through: { attributes: [] },
            },
          });
          res.status(200).json(countries);
        } catch (error) {
          console.error(`Error al buscar los países: ${error.message}`);
          res.status(500).json({ error: 'Error al buscar los países' });
        }
      };
    
    const getCountries = async (name) => {
        const country = await Country.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          include: {
            model: Activity,
            through: { attributes: [] },
          },
        });
        return country;
      
    }
        
      
      

      const getCountryId = async (req, res) => {
        const {id} = req.params;
        try {
          const country = await Country.findOne({
            where: {
              id: {
                [Op.iLike]: `%${id}%`,
              },
            },
          });
          res.status(200).send(country)
        } catch (error) {
          res.status(400).send(error.message)
        }
      };
      
module.exports = {
    getAllCountries,
    getCountries,
    getCountryId
};