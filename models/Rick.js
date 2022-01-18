

const { urlencoded } = require('express');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const juventusSchema = new Schema(
  {
    player_name: { type: String, required: true },
    player_age:{type: String},
    player_type: { type: String },
    player_image:{type:String}
  },
  {
    timestamps: true,
  }
);

const Rick = mongoose.model('ricks', juventusSchema);
module.exports = Rick;

