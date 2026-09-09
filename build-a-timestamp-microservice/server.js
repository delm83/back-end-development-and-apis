import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
// The {/:date} tells Express that the slash and the date are both optional
app.get("/api{/:date}", (req, res) => {
  let dateInput = req.params.date;
  let dateOutput;
  
  // return current date if string is empty
  !dateInput ? dateOutput = new Date()
  : isNaN(dateInput) ? dateOutput = new Date(dateInput)
  : dateOutput = new Date(parseInt(dateInput));
  
  dateOutput.toString() === 'Invalid Date' 
    ? res.json({ error: "Invalid Date" })
    : res.json({ unix: dateOutput.getTime(), utc: dateOutput.toUTCString() });
});
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
