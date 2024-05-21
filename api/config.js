const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("rplsma09_smeadigital","smeadigital","darthside",{
    host:"103.28.148.114",
    dialect:"mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    } 
})

module.exports = sequelize