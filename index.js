const express = require("express");
const cors = require("cors");
const model = require("./mongo");

const app = express();
const port = 5000 || process.env.PORT;
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await model.findOne({ email: email, password: password });
    if (check) {
      res.json("exist");
    } else {
      res.json("not exist");
    }
  } catch (error) {
    res.json(error);
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const user = {
    email: email,
    password: password,
  };

  try {
    const check = await model.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("not exist");
      await model.insertMany([user]);
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
