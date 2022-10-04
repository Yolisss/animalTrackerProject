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
    const individuals = await db.any("SELECT * FROM individuals ORDER BY id", [
      true,
    ]);
    //send the data back to the server based on the species that came from the db
    res.send(individuals);
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
  const individuals = {
    //server targetting these values
    id: req.body.id,
    nick_name: req.body.nick_name,
    species_id: req.body.species_id,
    seen_on: req.body.seen_on,
  };
  console.log(individuals);
  //try is inserting it into our db
  try {
    const createdIndividuals = await db.one(
      `INSERT INTO individuals(id, nick_name, species_id, seen_on) VALUES($1, $2, $3, $4) RETURNING *`,
      [
        individuals.id,
        individuals.nick_name,
        individuals.species_id,
        individuals.seen_on,
      ]
    );
    console.log(req.body);
    //it'll be added to database
    res.send(createdIndividuals);
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
  const individualsId = req.params.id;
  try {
    await db.none("DELETE FROM individuals WHERE id=$1", [individualsId]);
    res.send({ status: "sucess" });
  } catch (e) {
    //if you don't have it, bring back an error
    return res.status(400).json({ e });
  }
});

//this allows for this router to be used in other files
export default router;
