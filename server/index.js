const server = require("./src/server");
const {  databaseConnection } = require("./src/db");
const { loadDataBase } = require ("./src/controllers/loadDataBase")
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await  databaseConnection.sync({ force : true})
  await loadDataBase()
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}
startServer()