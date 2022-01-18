const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://escri85:6UpCzYYqDiQ3GmH@cluster0.8nqed.mongodb.net/juventus?retryWrites=true&w=majority';
const CONFIG_DB = {useNewUrlParser: true,useUnifiedTopology: true,}
const connectToDb = async () => {
    try {
      const response = await mongoose.connect(DB_URL, CONFIG_DB);
      const { host, port, name } = response.connection;
      console.log(`Conectado a ${name} en ${host}:${port}`);
    } catch(error) {
      console.log("Error conectando a la DB", error)
    }
  };
  
  module.exports = {
    DB_URL,
    CONFIG_DB,
    connectToDb,
  };
  