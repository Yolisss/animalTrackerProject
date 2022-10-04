//server connected to db
import db from "../db/dbConnection.js";
import express from "express";
//telling express for which handlers to use
const router = express.Router();
/* GET users listing. */

//9-20 considered request handler
//within it we are using a try/catch block
router.get("/", async function (req, res) {
  try {
    const sightings = await db.any("SELECT * FROM sightings ORDER BY id", [
      true,
    ]);
    //send the data back to the server based on the sightings that came from the db
    res.send(sightings);
    //catch unexpected errors
    //console log err
    //and send response with a 400 error to client
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});
//"/" main part where you're storing the information
//post request
router.post("/", async (req, res) => {
  const sightings = {
    //server targetting these values
    id: req.body.id,
    date_time: req.body.date_time,
    location: req.body.location,
    healthy: req.body.healthy,
    email: req.body.email,
    individual_id: req.body.individual_id,
    created_on: req.body.created_on,
  };
  console.log(sightings);
  //try is inserting it into our db
  try {
    const createdSightings = await db.one(
      `INSERT INTO sightings(id, date_time, location, healthy, email, individual_id, created_on) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        sightings.id,
        sightings.date_time,
        sightings.location,
        sightings.healthy,
        sightings.email,
        sightings.individual_id,
        sightings.created_on,
      ]
    );
    console.log(req.body);
    //it'll be added to database
    res.send(createdSightings);
    //if you can't, return an error
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//delete request
//router is your "/", in this case "/:id"; where you'll be
//directing the data to
//for ex, this is directing it specifically to the id
router.delete("/:id", async (req, res) => {
  //if you find id within the function, delete it
  const sightingsId = req.params.id;
  try {
    await db.none("DELETE FROM sightings WHERE id=$1", [sightingsId]);
    res.send({ status: "sucess" });
  } catch (e) {
    //if you don't have it, bring back an error
    return res.status(400).json({ e });
  }
});

//this allows for this router to be used in other files
export default router;
