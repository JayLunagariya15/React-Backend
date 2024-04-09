const mongoose = require('mongoose');
const Connection = (username, password) => {

    // const URL = 'mongodb+srv://user1:CCZmoL2VXQXwxhW8@sample.dscv0qh.mongodb.net/boiler'
    const URL = 'mongodb+srv://jaylunagariya:Jay1501@cluster0.wp4chqh.mongodb.net/boiler'
    try {
        mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Error in Database Connection", error);
    };
};

module.exports = { Connection };