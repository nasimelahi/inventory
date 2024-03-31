const mongoose = require('mongoose');
const db = require('../utils/dbKey').mongoURI
//DB connection
mongoose.connect(db,{useNewUrlParser:true , useUnifiedTopology : true })
    .then(() => {
        console.log('Mongodb is connected')
    })
    .catch((err) => {
        console.log(err)
})

module.exports = mongoose