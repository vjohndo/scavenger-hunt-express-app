const express = require("express");
const Challenges = require("../models/challenges");
const ensureAuth = require("../middleware/ensureAuth")
const router = express.Router();

// Run this to be able to parse through body
router.use(express.json());

router.use(ensureAuth);

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


    // Need to query the DB while waiting on the requests
    // This implementation keeps using .then to run synchronusly, in future figure out a better way and make sure to call then on the right brackets

    Challenges.addressExists(req.body)
        .then( (dbRes) => {
            if (dbRes) {
                errorMessage.message += 'Address already exists in DB. ';
            }
        })
                .then( () => {
                    Challenges.challengeExists(req.body).then( (dbRes) => {
                        if (dbRes) {
                            errorMessage.message += 'Challenge already exists in DB. ';
                        };
                    })
                        .then( () => {
                            if (errorMessage.message) {
                                res.status(400).json(errorMessage);
                                return
                            } else {
                                Challenges.insertByJSON(req.body).then((dbRes) => {
                                    // If you call this API the request.data will contain this HJSON FILE. 
                                    res.json(dbRes);
                                });
                            }
                        })
                })
});

router.delete("/:id", (req, res) => {
    const reqId = req.params.id;
    Challenges.getById(reqId).then((challenges) => {
        if (challenges) {
            Challenges.delete(reqId)
            res.json({message: 'Deleted'})
        } else {
            res.status(400).json({message: 'ID does not exist'})
        }
    })
})

module.exports = router;