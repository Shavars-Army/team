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

let warenkorb = [];

function getWarenkorb() {
  try {
    const data = fs.readFileSync("./warenkorb.json");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}


function saveWarenkorb() {
  fs.writeFileSync("./warenkorb.json", JSON.stringify(warenkorb, null, 2));
}

app.get("/warenkorb", (req, res) => {
  const warenkorbData = getWarenkorb();
  res.json(warenkorbData);
});



function appendToWarenkorb(product) {

  let warenkorbData = getWarenkorb();
  const existingProductIndex = warenkorbData.findIndex(item => item.title === product.title);

  if (existingProductIndex !== -1) {
    warenkorbData[existingProductIndex].menge += 1;
  } else {
    warenkorbData.push(product);
  }

  fs.writeFileSync("./warenkorb.json", JSON.stringify(warenkorbData, null, 2));}

app.post("/add-to-cart", (req, res) => {
  const { product } = req.body;
  appendToWarenkorb(product);
  res.json({ message: "Produkt erfolgreich zum Warenkorb hinzugefügt!" });
});

app.delete("/wk/:index", (req, res) => {
  let waren = getWarenkorb()
const index = parseInt(req.params.index);
if (index >= 0 && index < waren.length) {
  waren = waren.filter((task, i) => i !== index);
 res.json({ message: "Produkt wurde erfolgreich gelöscht" });
  fs.writeFileSync("./warenkorb.json", JSON.stringify(waren, null, 2))
}else {
  res.status(400).json({message: "Bitte einen gültigen Index angeben"})
}
});
app.delete("/wk1/:index", (req, res) => {
  let waren = getWarenkorb();
  const index = parseInt(req.params.index);

  if (waren[index].menge > 1) {
    waren[index].menge -= 1;
    fs.writeFileSync("./warenkorb.json", JSON.stringify(waren, null, 2));
    res.json({ message: "Produkt erfolgreich gelöscht" });
  } else {
    res.status(400).json({ error: "Die Menge kann nicht auf unter 1 reduziert werden. Bitte löschen Sie das gesamte Produkt." });
  }
});


app.listen(3002);