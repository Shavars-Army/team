import React, { useEffect, useState } from "react";
import Product from "./Product";
import Warenkorb  from "../Warenkorb";
import Header from "./Header";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [waren, setWaren] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [cat,setCat] = useState("")

  // useEffect(() => {}, []); -> Grundgerüst von useEffect
  function fetchAllData() {
    fetch("http://localhost:3002/warenkorb")
    .then((response) => response.json())
    .then((data) => setWaren(data))
    .catch((error) => console.error("Fehler beim API-Aufruf", error));
  }
  useEffect(() => {
    //3kat2();
   fetch("http://localhost:3002/warenkorb")
    .then((response) => response.json())
    .then((data) => setWaren(data))
    .catch((error) => console.error("Fehler beim API-Aufruf", error));

  }, []);
  async function addProductToCart(product) {
    await fetch("http://localhost:3002/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
        // Optionally, you can handle success response here
      })
      .catch((error) => console.error("Error adding product to cart:", error));
      await fetchAllData();
  }
  
  async function deletefromcart(index) {
    await fetch(`http://localhost:3002/wk/${index}`, {
      method: "DELETE",
    });
    await fetchAllData();
    // const updatedTasks = tasks.filter((task, i) => i !== index);
    // const updatedTasks = tasks.filter((_, i) => i !== index); // quasi das gleiche, nur anders geschrieben
    // setTasks(updatedTasks);
  }

function kat1(event){
  const text = event.target.textContent;
  setCat(text)
  fetch("http://localhost:3002/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Fehler beim API-Aufruf", error));
}
function kat2(event){
  const text = event.target.textContent;
  setCat(text)
  fetch("http://localhost:3002/tasks1")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Fehler beim API-Aufruf", error));
}
function kat3(event){
  const text = event.target.textContent;
  setCat(text)
  fetch("http://localhost:3002/tasks3")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Fehler beim API-Aufruf", error));
}
 

    return (

      <div className="to-do-list">
     
        <div>
        
          <button className="add-button" onClick={kat1}>
           Electronics
          </button>
          <button className="add-button" onClick={kat2}>
            Books
          </button>
          <button className="add-button" onClick={kat3}>
            Kitchen
          </button>
          <br></br>
          <h1 style={{ textAlign: 'center' }}>{cat}</h1>
        </div>
        <div className="container">
          
            {tasks.map((task, index) => (
             <div  className="produktitem" key={index}>
                <Product 
                
                image={task.image}
                 title={task.title}
                 description={task.description}
                 menge={task.menge}
                 price={task.price}
               
                
                />
                <button onClick={() => addProductToCart(task)}>hinzufügen</button>

                </div>
                
                
                
               
            
            ))}
            
        </div>
        <br></br>
            <hr></hr>
            <Warenkorb/>
            <div className="container">
          
            {waren.map((task, index) => (
             <div  key={index}>
                <Product 
                
                image={task.image}
                 title={task.title}
                 description={task.description}
                 price={task.price}
                 menge={task.menge}
                 
                
                />
                <button onClick={() => deletefromcart(index)}>delete</button>

                </div>
                
                
                
               
            
            ))}
            
        </div>
           
          
      </div>
    );
  }

export default TodoList;
