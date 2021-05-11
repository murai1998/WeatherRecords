const router = require("express").Router();

let Record = require("../models/record.model");




router.get("/:id", (req, res) => {

   Record.find({id: req.params.id})
    .then(sale => {
        
        console.log(sale);
        res.json(sale)
    }
        )
    .catch(err => res.status(400).json("Error" + err));
});
module.exports = router;