const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");


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

function appendToWarenkorb(product) {
  // Get current warenkorb data

  let warenkorbData = getWarenkorb();

  // Check if the product already exists in the warenkorb
  const existingProductIndex = warenkorbData.findIndex(item => item.title === product.title);

  if (existingProductIndex !== -1) {
    // If product already exists, update the quantity
    warenkorbData[existingProductIndex].menge += 1;
  } else {
    // If product doesn't exist, push it to warenkorbData
    warenkorbData.push(product);
  }

  // Write the updated warenkorb data back to the file
  fs.writeFileSync("./warenkorb.json", JSON.stringify(warenkorbData, null, 2));}

// POST endpoint to add a product to the warenkorb
app.post("/add-to-cart", (req, res) => {
  const { product } = req.body;

  // Add product to warenkorb
  appendToWarenkorb(product);

  // Respond with a success message or any relevant data
  res.json({ message: "Product added to cart successfully!" });
});

app.delete("/wk/:index", (req, res) => {
  let waren = getWarenkorb()
// parseInt ist hier notwendig, da die params als String gespeichert werden
const index = parseInt(req.params.index);
if (index >= 0 && index < waren.length) {
  waren = waren.filter((task, i) => i !== index);
 //waren.splice(index, 1); 
 res.json({ message: "Task wurde erfolgreich gelöscht" });
  fs.writeFileSync("./warenkorb.json", JSON.stringify(waren, null, 2))
}else {
  res.status(400).json({message: "Bitte einen gültigen Index angeben"})
}
});

app.listen(3002);
