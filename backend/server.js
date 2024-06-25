const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs")

app.use(cors());
app.use(express.json());

function getTasks(){
    const data =fs.readFileSync("./tasks.json")
    return JSON.parse(data)
}

function getTasks3(){
  const data =fs.readFileSync("./tasks3.json")
  return JSON.parse(data)
}
function getTasks1(){
  const data =fs.readFileSync("./tasks1.json")
  return JSON.parse(data)
}

// Holt mir alle Tasks
app.get("/tasks", (req, res) => {
    let tasks = getTasks()
  res.json(tasks);
});
app.get("/tasks1", (req, res) => {
  let tasks = getTasks1()
res.json(tasks);
});
app.get("/tasks3", (req, res) => {
  let tasks = getTasks3()
res.json(tasks);
});

// Holt mir ein bestimmtes Element aus der Tasks Liste


// Move task up
// Move task down



let warenkorb = [];

// Helper function to read the warenkorb.json file
function getWarenkorb() {
  try {
    const data = fs.readFileSync("./warenkorb.json");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or error reading, return empty array
    return [];
  }
}

// Helper function to write the warenkorb to the file
function saveWarenkorb() {
  fs.writeFileSync("./warenkorb.json", JSON.stringify(warenkorb, null, 2));
}

// GET endpoint to fetch the current contents of the warenkorb
app.get("/warenkorb", (req, res) => {
  const warenkorbData = getWarenkorb();
  res.json(warenkorbData);
});

// POST endpoint to add a product to the warenkorb
app.post("/add-to-cart", (req, res) => {
  const { product } = req.body;

  // Push the product to the warenkorb array
  warenkorb.push(product);

  // Save the updated warenkorb to warenkorb.json
  saveWarenkorb();

  // Respond with a success message or any relevant data
  res.json({ message: "Product added to cart successfully!" });
});






app.listen(3002);
