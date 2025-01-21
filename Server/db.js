const {Pool} = require('pg');

//Create a new pool instance

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'employeems',
    password : 'Kingsr@08',
    port : 5432,
    
});

pool.connect(function(err) {
    if(err){
        console.log('Connection error')
    }else{
        console.log('Connected')
    }
})

module.exports = pool;