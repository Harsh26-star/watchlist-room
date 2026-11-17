require("./db");

const statuses = ["watching", "completed", "planned"];
const types = ["movie", "anime", "video"];

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = 3000;
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/media", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM media ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/media", async (req, res) => {
  if (
    !req.body ||
    typeof req.body.title !== "string" ||
    req.body.title.trim() === ""
  ) {
    res.status(400).json({ error: "Invalid title syntax" });
    return;
  }
  if (!types.includes(req.body?.type)) {
    res.status(400).json({ error: "Invalid type entered" });
    return;
  }
  if (!statuses.includes(req.body?.status)) {
    res.status(400).json({ error: "Invalid status entered" });
    return;
  }
  if (
    req.body.description !== undefined &&
    typeof req.body.description !== "string"
  ) {
    res.status(400).json({ error: "Invalid Description syntax" });
    return;
  }
  const newItem = {
    title: req.body.title.trim(),
    status: req.body.status,
    type: req.body.type,
    description: req.body?.description?.trim() ?? "",
  };
  try {
    const result = await pool.query(
      "INSERT INTO media (title, type, status, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [newItem.title, newItem.type, newItem.status, newItem.description],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

app.delete("/media/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "Invalid id syntax" });
    return;
  }
  try {
    const result = await pool.query("DELETE FROM media WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: "The id doesn't exist" });
      return;
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
    console.error(error);
  }
});

app.patch("/media/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "Invalid id syntax" });
    return;
  }
  if (req.body?.status && !statuses.includes(req.body?.status)) {
    res.status(400).json({ error: "Enter a valid Status" });
    return;
  }
  if (
    req.body?.title !== undefined &&
    (typeof req.body.title !== "string" || req.body.title.trim() === "")
  ) {
    res.status(400).json({ error: "Invalid title syntax" });
    return;
  }
  if (!req.body?.title && !req.body?.status) {
    res.status(400).json({ error: "Enter a title or status" });
    return;
  }
  try {
    const result = await pool.query(
      "UPDATE media SET title = COALESCE($1, title), status = COALESCE($2, status) WHERE id = $3 RETURNING *",
      [req.body.title?.trim() ?? null, req.body.status, id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "The id doesn't exist" });
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port 3000`);
});
