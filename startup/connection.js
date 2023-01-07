const mongoose = require('mongoose')

module.exports = function (connection_string) {


    mongoose.connect(connection_string, {})

        .then(() => console.log("The something has been connected "))
        .catch((er) => console.log("Something is wrong", (er)))
    // .catch(err => console.error('Error connecting', err))
}