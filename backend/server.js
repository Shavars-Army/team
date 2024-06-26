const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

// Middleware setup
app.use(cors()); // Erlaubt Cross-Origin Requests
app.use(express.json()); // Parse JSON request bodies

// Funktionen zur Datenbeschaffung für Kategorien
function getCategory() {
    const data = fs.readFileSync("./Category.json"); // Liest Category.json Datei
    return JSON.parse(data); // Parst die JSON-Daten und gibt sie zurück
}
function getCategory1() {
  const data = fs.readFileSync("./Category1.json"); // Liest Category1.json Datei
  return JSON.parse(data); // Parst die JSON-Daten und gibt sie zurück
}
function getCategory3() {
    const data = fs.readFileSync("./Category3.json"); // Liest Category3.json Datei
    return JSON.parse(data); // Parst die JSON-Daten und gibt sie zurück
}



// Endpunkte zum Abrufen von Kategorien
app.get("/Category", (req, res) => {
    let Category = getCategory(); // Ruft die Funktion getCategory auf
    res.json(Category); // Sendet die Kategoriedaten als JSON zurück
});

app.get("/Category1", (req, res) => {
    let Category = getCategory1(); // Ruft die Funktion getCategory1 auf
    res.json(Category); // Sendet die Kategoriedaten als JSON zurück
});

app.get("/Category3", (req, res) => {
    let Category = getCategory3(); // Ruft die Funktion getCategory3 auf
    res.json(Category); // Sendet die Kategoriedaten als JSON zurück
});

// Initialisierung des Warenkorbs als leeres Array
let warenkorb = [];

// Hilfsfunktionen zum Lesen und Schreiben der warenkorb.json Datei
function getWarenkorb() {
    try {
        const data = fs.readFileSync("./warenkorb.json"); // Versucht, die Datei zu lesen
        return JSON.parse(data); // Parst die JSON-Daten und gibt sie zurück
    } catch (error) {
        return []; // Falls ein Fehler auftritt oder die Datei nicht existiert, gibt es ein leeres Array zurück
    }
}

function saveWarenkorb() {
    fs.writeFileSync("./warenkorb.json", JSON.stringify(warenkorb, null, 2)); // Schreibt den Warenkorb als JSON formatiert in die Datei
}

// GET-Endpunkt, um den aktuellen Inhalt des Warenkorbs abzurufen
app.get("/warenkorb", (req, res) => {
    const warenkorbData = getWarenkorb(); // Ruft den aktuellen Warenkorb ab
    res.json(warenkorbData); // Sendet die Warenkorbdetails als JSON zurück
});

// POST-Endpunkt, um ein Produkt zum Warenkorb hinzuzufügen
function appendToWarenkorb(product) {
    let warenkorbData = getWarenkorb(); // Ruft den aktuellen Warenkorb ab

    const existingProductIndex = warenkorbData.findIndex(item => item.title === product.title); // Sucht nach dem Index des vorhandenen Produkts im Warenkorb

    if (existingProductIndex !== -1) {
        warenkorbData[existingProductIndex].menge += 1; // Wenn das Produkt bereits existiert, erhöht es die Menge um eins
    } else {
        warenkorbData.push(product); // Fügt das Produkt dem Warenkorb hinzu, falls es nicht existiert
    }

    fs.writeFileSync("./warenkorb.json", JSON.stringify(warenkorbData, null, 2)); // Schreibt die aktualisierten Warenkorbdetails in die Datei
}

app.post("/add-to-cart", (req, res) => {
    const { product } = req.body; // Extrahiert das Produkt aus dem Anfragekörper

    appendToWarenkorb(product); // Fügt das Produkt dem Warenkorb hinzu

    res.json({ message: "Produkt erfolgreich zum Warenkorb hinzugefügt!" }); // Sendet eine Erfolgsmeldung zurück
});

// DELETE-Endpunkt, um ein Produkt aus dem Warenkorb zu löschen
app.delete("/wk/:index", (req, res) => {
    let waren = getWarenkorb(); // Ruft den aktuellen Warenkorb ab
    const index = parseInt(req.params.index); // Konvertiert den Indexparameter in eine Ganzzahl

    if (index >= 0 && index < waren.length) { // Überprüft, ob der Index gültig ist
        waren = waren.filter((task, i) => i !== index); // Filtert das Produkt aus dem Warenkorb
        res.json({ message: "Produkt wurde erfolgreich gelöscht" }); // Sendet eine Erfolgsmeldung zurück
        fs.writeFileSync("./warenkorb.json", JSON.stringify(waren, null, 2)); // Schreibt die aktualisierten Warenkorbdetails in die Datei
    } else {
        res.status(400).json({ message: "Bitte einen gültigen Index angeben" }); // Sendet eine Fehlermeldung zurück, falls der Index ungültig ist
    }
});

// DELETE-Endpunkt, um die Menge eines Produkts im Warenkorb zu reduzieren
app.delete("/wk1/:index", (req, res) => {
    let waren = getWarenkorb(); // Ruft den aktuellen Warenkorb ab
    const index = parseInt(req.params.index); // Konvertiert den Indexparameter in eine Ganzzahl

    if (waren[index].menge > 1) { // Überprüft, ob die Menge größer als eins ist
        waren[index].menge -= 1; // Reduziert die Menge um eins
        fs.writeFileSync("./warenkorb.json", JSON.stringify(waren, null, 2)); // Schreibt die aktualisierten Warenkorbdetails in die Datei
        res.json({ message: "Menge des Produkts erfolgreich reduziert" }); // Sendet eine Erfolgsmeldung zurück
    } else {
        res.status(400).json({ error: "Die Menge kann nicht auf unter 1 reduziert werden. Bitte löschen Sie das gesamte Produkt." }); // Sendet eine Fehlermeldung zurück, falls die Menge nicht weiter reduziert werden kann
    }
});

// Server starten und auf Anfragen auf Port 3002 hören
app.listen(3002, () => {
    console.log("Server läuft auf Port 3002");
});
