const mongoose = require('mongoose');

module.exports = () => {
  const db = "mongodb+srv://admin:admin@growthassignment.slf7dls.mongodb.net/?retryWrites=true&w=majority";
  mongoose.connect(db)
    .then(() => console.info(`Connected to ${db}...`))
    .catch((err) => console.error(err))
}