import express from "express";
import cors from "cors";
//why?
import bodyParser from "body-Parser";

const app = express();
const PORT = 8080;

app.use(cors());
//why?
app.use(bodyParser.json());

//routers from db
import db from "./db/DbConnection.js";
//allowed to use this router because we exported it from species.js
import speciesRouter from "./routes/species.js";
import sightingsRouter from "./routes/sightings";
import individualsRouter from "./routes/individuals";

//once path is typed in URL("/species"), speciesRouter will show us
//species info from species.js (refer to line 16)
app.use("/species", speciesRouter);
app.use("/sightings", sightingsRouter);
app.use("/individuals", individualsRouter);

app.get("/", function (req, res) {
  //message will display on browser
  res.json("Get request working");
});

//message will display in console
app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));
