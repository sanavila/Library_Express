const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLenght: 100 },
  family_name: { type: String, required: true, maxLenght: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";

  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  if (!this.first_name || !this.family_name) {
    fullname = " ";
  }
  return fullname;
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

// Export model
// The first argument is the singular name of the collection that will be created for your model
// (Mongoose will create the database collection for the above model SomeModel above),
// and the second argument is the schema you want to use in creating the model.
module.exports = mongoose.model("Author", AuthorSchema);
