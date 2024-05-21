const {Sequelize} = require("sequelize")
const dotenv = require("dotenv")
dotenv.config({path:"../.env"})

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Important for Supabase SSL connections
    },
  },
})

module.exports = sequelize