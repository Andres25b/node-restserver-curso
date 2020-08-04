const mongoose = require('mongoose');
const colors = require('colors/safe');
require('../config/config');

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,    
})
.then(res => console.log(colors.green('Connected to Mongo!!')))
.catch(() => console.log(colors.red('Error connecting to Mongo')));