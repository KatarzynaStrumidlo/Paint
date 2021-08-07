const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  picture: { type: String, required: true }
});

module.exports = mongoose.model('Example', exampleSchema);
