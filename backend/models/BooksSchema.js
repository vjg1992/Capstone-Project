const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseSchema = require('./BaseSchema');

const BooksSchema = new Schema({
  Author: { type: [String], required: true },
  ISBN: { type: String },
  Publisher: { type: String, required: true }, 
  PublicationYear: { type: Number },
  Genre: { type: [String] }, 
  Language: { type: String }, 
  PageCount: { type: Number }
});

const Books = BaseSchema.discriminator('Books', BooksSchema);

module.exports = Books;
