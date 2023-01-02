const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        // enum: his allows us to set the allowed values of a string.
        enum: [ "Fiction", "Romance", "Military history", "Action", "Humor", "Suspense", "Horror"],
    }
});

GenreSchema.virtual("url").get(function(){
    return `/catalog/genreschema/${this._id}`;
});

module.exports = mongoose.model("GenreSchema", GenreSchema);
