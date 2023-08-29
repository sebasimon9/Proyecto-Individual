require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST
} = process.env;


const sequelize = new Sequelize( `postgres:${ DB_USER }:${ DB_PASSWORD }@${ DB_HOST }/countries`, { logging: false, native: false } )
const basename = path.basename( __filename )

const modelDefiners = []

fs.readdirSync(path.join(__dirname, '/models'))
  .filter( file => ( file.indexOf( '.' ) !== 0 ) && ( file !== basename ) && ( file.slice( -3 ) === '.js' ) )
  .forEach(file => { modelDefiners.push( require( path.join( __dirname, '/models', file ) ) ) } )

  modelDefiners.map( model => model( sequelize ) ) // Itera sobre los modelos y los ejecuta para definir los modelos en Sequelize

  const entries = Object.entries( sequelize.models ) // Obtiene las entradas [nombre, modelo] del objeto 'sequelize.models'
  
  // Convierte la primera letra del nombre en mayúscula
  const capsEntries = entries.map(entry => [ entry[ 0 ][ 0 ].toUpperCase() + entry[ 0 ].slice( 1 ), entry[ 1 ] ] )
  
  sequelize.models = Object.fromEntries( capsEntries ) // Actualiza el objeto 'sequelize.models' con las entradas en mayúscula

  const { Country, Activity } = sequelize.models

  
  // Establece relaciones de muchos a muchos entre Country y Activity
  Activity.belongsToMany(Country, { through: "CountryActivity" });
  Country.belongsToMany(Activity, { through: "CountryActivity" });

  module.exports = { ...sequelize.models, databaseConnection: sequelize }