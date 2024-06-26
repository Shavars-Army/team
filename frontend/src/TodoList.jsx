import React, { useEffect, useState } from "react";
import Product from "./Product";
import Warenkorb from "../Warenkorb";
import Header from "./Header";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [waren, setWaren] = useState([]);
  const [cat, setCat] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  function fetchAllData() {
    fetch("http://localhost:3002/warenkorb")
      .then((response) => response.json())
      .then((data) => setWaren(data))
      .catch((error) => console.error("Fehler beim API-Aufruf", error));
  }

  async function addProductToCart(product) {
    try {
      const response = await fetch("http://localhost:3002/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
      });
      await fetchAllData();
      const data = await response.json();

      if (response.ok) {
      } else {
        throw new Error(data.error || "An error occurred while adding the product to the cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Error adding product to cart: " + error.message);
    }
  }

  async function deletefromcart(index) {
    try {
      const response = await fetch(`http://localhost:3002/wk/${index}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      alert(data.message);

      await fetchAllData();
    } catch (error) {
      alert(error.message);
    }
  }

  async function deletefromcart1(index) {
    try {
      const response = await fetch(`http://localhost:3002/wk1/${index}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      await fetchAllData();
    } catch (error) {
      alert(error.message);
    }
  }

  function kat1(event) {
    const text = event.target.textContent;
    setCat(text);
    fetch("http://localhost:3002/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Fehler beim API-Aufruf", error));
  }

  function kat2(event) {
    const text = event.target.textContent;
    setCat(text);
    fetch("http://localhost:3002/tasks1")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Fehler beim API-Aufruf", error));
  }

  function kat3(event) {
    const text = event.target.textContent;
    setCat(text);
    fetch("http://localhost:3002/tasks3")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Fehler beim API-Aufruf", error));
  }

  return (
    <div>
      <div className="product-list">
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
      </div>
      <div className="container">
        {tasks.map((task, index) => (
          <div className="produktitem" key={index}>
            <Product
              image={task.image}
              title={task.title}
              description={task.description}
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
      {waren.length > 0 && (
        <div className="main-content">
          <div className="warenkorb">
            <Warenkorb />
            <div className="container1">
              {waren.map((task, index) => (
                <div className="waren-item" key={index}>
                  <Product
                    image={task.image}
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
                      Entfernen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  
}

export default TodoList;