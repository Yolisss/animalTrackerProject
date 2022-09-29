import db from "../db/DbConnection";
import express from "express";
//telling express for which handlers to use
const router = express.Router();
/* GET users listing. */

//8-16 considered request handler
//we are using a try/catch block
router.get("/", async function (req, res) {
  try {
    const species = await db.any("SELECT * FROM species ORDER BY id", [true]);
    //send the data back to the server based on the species that came from the db
    res.send(species);
    //catch unexpected errors
    //console log err
    //and send response with a 400 error to client
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//this allows for this router to be used in other files
export default router;
