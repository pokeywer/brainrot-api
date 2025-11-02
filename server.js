const express = require("express");
const app = express();
app.use(express.json());

let brainrotPets = [];

app.post("/addpet", (req, res) => {
  const { name, generation, rarity, jobId, joinScript } = req.body;
  if (!name || !generation || !rarity || !jobId || !joinScript) {
    return res.status(400).send("Missing fields");
  }

  if (!brainrotPets.find(p => p.jobId === jobId && p.name === name)) {
    brainrotPets.push({ name, generation, rarity, jobId, joinScript });
  }

  if (brainrotPets.length > 50) brainrotPets.shift();
  res.send("Pet added!");
});

app.get("/pets", (req, res) => res.json(brainrotPets));

app.get("/", (req, res) => res.send("🧠 Brainrot API Online!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
