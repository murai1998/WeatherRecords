const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    id: {
      type: String
    },
    data: { type: String},

  },
          { collection: 'Record' }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;