

//   const fs = require('fs');
// const parse = require('csv-parse');
// const mongoose = require('mongoose');
// require("dotenv").config();

// const uri = process.env.URI;

// mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

// const connection = mongoose.connection;

// connection.once('open', function () {
//     const record = new mongoose.Schema(
//         {
//             id: {
//                 type: String
//             },
//             data: {
//                 type: String
//             }
//         },
//         { collection: 'Record' }
//     );
//     const model = mongoose.model('record', record);
//     fs.createReadStream('2017.csv')
//         .pipe(parse({ delimiter: ',' }))
//         .on('data', async (csvrow) => {
//             try{
//             await model.create([{
//                 id: csvrow[0],
//                 data: JSON.stringify(csvrow)
//             }]);
//         } catch(err){
//             console.log(err)
//         }
            
//             console.log(csvrow);
//             global.gc();
//         });
// });



const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.enable("trust proxy");
require("dotenv").config();
const port = process.env.PORT || 5000;
const uri = process.env.URI;
const path = require("path");



mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(async x => {
      console.log("Connected!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database successfully connected!");
});
app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build"));
  });
}
app.use(cors());

const weather = require("./routes/weather.route");
app.use("/api", weather);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});