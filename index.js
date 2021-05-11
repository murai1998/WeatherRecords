

  const fs = require('fs');
const parse = require('csv-parse');
const mongoose = require('mongoose');
require("dotenv").config();

const uri = process.env.URI;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function () {
    const record = new mongoose.Schema(
        {
            id: {
                type: String
            },
            data: {
                type: String
            }
        },
        { collection: 'Record' }
    );
    const model = mongoose.model('record', record);
    fs.createReadStream('2017.csv')
        .pipe(parse({ delimiter: ',' }))
        .on('data', async (csvrow) => {
            try{
            await model.create([{
                id: csvrow[0],
                data: JSON.stringify(csvrow)
            }]);
        } catch(err){
            console.log(err)
        }
            
            console.log(csvrow);
            global.gc();
        });
});