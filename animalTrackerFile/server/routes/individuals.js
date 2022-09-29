//server connected to db
import db from "../db/DbConnection";
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

//this allows for this router to be used in other files
export default router;
