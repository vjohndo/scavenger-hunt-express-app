const e = require("express");
const express = require("express");
const db = require("../database/db");
const Challenges = require("../models/challenges");
const router = express.Router();

// Run this to be able to parse through body
router.use(express.json());

// At this point we'll have taken in a route with api/challenges
router.get("/", (req, res) => {
  console.log("getting challenges");
  Challenges.getAll().then((challenges) => {
    res.json(challenges);
  });
});

// ALTERNATE ASYNC SYNTAX
// app.get("/", async(req,res) => {
//   const challenges = await Challenges.getAll();
//   res.json(challenges);
// });


router.get("/:id", (req, res) => {
    const reqId = req.params.id;
    console.log("getting unique challenges");
    Challenges.getById(reqId).then((challenges) => {
      res.json(challenges);
    });
});

// Katie's code example 
// router.post('/', (req, res) => {
//     const { name, challenge, address } = req.body
//     if (name === undefined || name === '') {
//         res.status(400).json({message: 'name is required'})
//         return
//     }
// })


router.post("/", (req, res) => {
    const {name, challenge, address} = req.body 

    console.log(!name, !challenge, !address);

    if (!name || !challenge || !address) {
        res.status(400).json({message: 'Empty fields'});
        return
    } 
    
    const errorMessage = {"message": ""};

    Challenges.addressExists(req.body).then((dbRes) => {
        console.log("address response", dbRes);
        if (dbRes) {
            errorMessage.message = 'Address already exists in DB. ';
        }
    });

    Challenges.challengeExists(req.body).then((dbRes) => {
        console.log("challenge response", dbRes);
        if (dbRes) {
            errorMessage["message"] = 'Challenge already exists in DB. ';
        };
    });

    console.log(errorMessage);

    if (errorMessage.message) {
        res.status(400).json(errorMessage);
        return
    }
    
    Challenges.insertByJSON(req.body).then((dbRes) => {
            // If you call this API the request.data will contain this HJSON FILE. 
            res.json(dbRes);
        });
    }
);

module.exports = router;