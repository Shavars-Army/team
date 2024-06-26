import React, { useEffect, useState } from "react";
import Product from "./Product";
import Warenkorb from "../Warenkorb";
import Header from "./Header";

// Hauptkomponente, die die Produktliste und den Warenkorb verwaltet
function TodoList() {
  const [Category, setCategory] = useState([]); // Zustand für die Produktkategorien
  const [waren, setWaren] = useState([]); // Zustand für den Warenkorb
  const [cat, setCat] = useState(""); // Zustand für die aktuelle Kategorie

  // useEffect-Hook, um Daten beim ersten Laden der Komponente abzurufen
  useEffect(() => {
    fetchAllData();
  }, []);

  // Funktion zum Abrufen aller Daten aus dem Warenkorb
  function fetchAllData() {
    fetch("http://localhost:3002/warenkorb")
      .then((response) => response.json())
      .then((data) => setWaren(data))
      .catch((error) => console.error("Fehler beim API-Aufruf", error));
  }

  // Asynchrone Funktion zum Hinzufügen eines Produkts zum Warenkorb
  async function addProductToCart(product) {
    try {
      // Senden einer HTTP POST-Anfrage an den Server
      const response = await fetch("http://localhost:3002/add-to-cart", {
        method: "POST", // HTTP Methode ist POST
        headers: {
          "Content-Type": "application/json", // Header gibt an, dass der Body der Anfrage JSON ist
        },
        body: JSON.stringify({ product }), // Produktdaten im Body der Anfrage senden
      });
      await fetchAllData(); // Daten nach dem Hinzufügen aktualisieren
      const data = await response.json(); // Antwort des Servers in JSON umwandeln

      if (response.ok) {
        // Erfolgsnachricht anzeigen (vorerst auskommentiert)
        // alert(data.message);
      } else {
        // Fehler werfen, falls die Antwort nicht erfolgreich ist
        throw new Error(data.error || "An error occurred while adding the product to the cart.");
      }
    } catch (error) {
      // Fehlerbehandlung
      console.error("Error adding product to cart:", error);
      alert("Error adding product to cart: " + error.message);
    }
  }

  // Asynchrone Funktion zum Löschen eines Produkts aus dem Warenkorb
  async function deletefromcart(index) {
    try {
      // Senden einer HTTP DELETE-Anfrage an den Server
      const response = await fetch(`http://localhost:3002/wk/${index}`, {
        method: "DELETE", // HTTP Methode ist DELETE
      });

      if (!response.ok) {
        // Fehler werfen, falls die Antwort nicht erfolgreich ist
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json(); // Antwort des Servers in JSON umwandeln
      alert(data.message); // Erfolgsnachricht anzeigen

      await fetchAllData(); // Daten nach dem Löschen aktualisieren
    } catch (error) {
      alert(error.message); // Fehlernachricht anzeigen
    }
  }

  // Alternative Funktion zum Löschen eines Produkts aus dem Warenkorb
  async function deletefromcart1(index) {
    try {
      // Senden einer HTTP DELETE-Anfrage an den Server
      const response = await fetch(`http://localhost:3002/wk1/${index}`, {
        method: "DELETE", // HTTP Methode ist DELETE
      });

      if (!response.ok) {
        // Fehler werfen, falls die Antwort nicht erfolgreich ist
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      await fetchAllData(); // Daten nach dem Löschen aktualisieren
    } catch (error) {
      alert(error.message); // Fehlernachricht anzeigen
    }
  }

  // Funktion zum Abrufen der ersten Kategorie
  function kat1(event) {
    const text = event.target.textContent; // Text des geklickten Buttons
    setCat(text); // Setzen der aktuellen Kategorie
    // Abrufen der Kategorien vom Server
fetch("http://localhost:3002/Category") // HTTP GET-Anfrage an den Server
.then((response) => response.json()) // Verarbeitet die Antwort und parst sie als JSON
.then((data) => setCategory(data)) // Setzt die abgerufenen Kategoriedaten im State (z.B. React state) oder speichert sie
.catch((error) => console.error("Fehler beim API-Aufruf", error)); // Fehlerbehandlung, falls die Anfrage fehlschlägt

  }

  // Funktion zum Abrufen der zweiten Kategorie
  function kat2(event) {
    const text = event.target.textContent; // Text des geklickten Buttons
    setCat(text); // Setzen der aktuellen Kategorie
    fetch("http://localhost:3002/Category1")
      .then((response) => response.json())
      .then((data) => setCategory(data)) // Setzen der abgerufenen Kategorien
      .catch((error) => console.error("Fehler beim API-Aufruf", error));
  }

  // Funktion zum Abrufen der dritten Kategorie
  function kat3(event) {
    const text = event.target.textContent; // Text des geklickten Buttons
    setCat(text); // Setzen der aktuellen Kategorie
    fetch("http://localhost:3002/Category3")
      .then((response) => response.json())
      .then((data) => setCategory(data)) // Setzen der abgerufenen Kategorien
      .catch((error) => console.error("Fehler beim API-Aufruf", error));
  }

  return (
    <div className="main-content">
      <div className="product-list">
        <div>
          {/* Buttons zum Wechseln der Kategorien */}
          <button className="add-button" onClick={kat1}>
            Electronics
          </button>
          <button className="add-button" onClick={kat2}>
            Books
          </button>
          <button className="add-button" onClick={kat3}>
            Kitchen
          </button>
          <br />
          {/* Anzeigen der aktuellen Kategorie */}
          <h1 style={{ textAlign: "center" }}>{cat}</h1>
        </div>
        <div className="container">
          {/* Anzeigen der Produkte in der aktuellen Kategorie */}
          {Category.map((task, index) => (
            <div className="produktitem" key={index}>
              <Product
                image={task.image}
                title={task.title}
                description={task.description}
                menge={task.menge}
                price={task.price}
              />
              <div className="product-actions">
                <button className="cart-button" onClick={() => addProductToCart(task)}>
                  hinzufügen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Anzeigen des Warenkorbs, falls Artikel vorhanden sind */}
      {waren.length > 0 && (
        <div className="warenkorb">
          <Warenkorb />
          <div className="container1">
            {waren.map((task, index) => (
              <div className="waren-item" key={index}>
                <Product
                  image={task.image}
                  title={task.title}
                  price={task.price}
                  menge={task.menge}
                />
                <div className="waren-actions">
                  <button className="up-button" onClick={() => deletefromcart1(index)}>
                    -
                  </button>
                  <button className="down-button" onClick={() => addProductToCart(task)}>
                    +
                  </button>
                  <button className="delete-button" onClick={() => deletefromcart(index)}>
                    Aus Warenkorb Entfernen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
