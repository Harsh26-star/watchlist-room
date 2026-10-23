let medias = [
  { id: 1, title: "Inception", status: "planned" },
  { id: 2, title: "Interstellar", status: "completed" },
];

const statuses = ["watching", "completed", "planned"];
const types = ["movie", "anime", "video"]

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
  if (!types.includes(req.body?.type)){
    res.status(400).json({ error: "Invalid type entered" });
    return;
  }
  if (!statuses.includes(req.body?.status)) {
    res.status(400).json({ error: "Invalid status entered" });
    return;
  }
  if (req.body.description !== undefined && typeof req.body.description !== "string") {
    res.status(400).json({ error: "Invalid Description syntax"})
    return
  }
  const newItem = { id: Date.now(), title: req.body.title.trim(), status: req.body.status, type: req.body.type, description:req.body?.description?.trim() ?? ""};
  medias.push(newItem);
  console.log(newItem);
  res.status(201).json(newItem);
});

app.delete("/media/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!medias.some((media) => media.id === id)) {
    res.status(404).json({ error: "The id doesn't exist" });
    return;
  }
  const newMedia = medias.filter((media) => media.id !== id);
  medias = newMedia;
  res.sendStatus(204);
});

app.patch("/media/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!medias.some((media) => media.id === id)) {
    res.status(404).json({ error: "The id doesn't exist" });
    return;
  }
  if (!statuses.includes(req.body?.status)) {
    res.status(400).json({ error: "Enter a valid status" });
    return;
  }
  const newMedias = medias.map((media) =>
    media.id === id ? { ...media, status: req.body.status } : media,
  );
  medias = newMedias;
  const changedStatus = medias.find((media) => media.id === id)
  res.status(200).json(changedStatus);
});

app.listen(port, () => {
  console.log(`Server running on port 3000`);
});
