let medias = [
  { id: 1, title: "Inception" },
  { id: 2, title: "Interstellar" },
];

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/media", (req, res) => {
  res.json(medias);
});
app.post("/media", (req, res) => {
  if (
    !req.body ||
    typeof req.body.title !== "string" ||
    req.body.title.trim() === ""
  ) {
    res.status(400).json({ error: "Invalid title syntax" });
    return;
  }
  const newItem = { id: Date.now(), title: req.body.title.trim() };
  medias.push(newItem);
  console.log(newItem);
  res.status(201).json(newItem);
});

app.delete("/media/:id", (req, res) => {
  console.log(typeof req.params.id);
  const id = Number(req.params.id);
  if (!medias.some((media) => media.id === id)) {
    res.status(404).json({ error: "The id doesn't exist" });
    return;
  }
  const newMedia = medias.filter((media) => media.id !== id)
  medias = newMedia
  res.sendStatus(204)
});

app.listen(port, () => {
  console.log(`Server running on port 3000`);
});
