import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");

  // Fetch data from backend
  useEffect(() => {
    axios.get("http://localhost:5000/items")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Add item to the database
  const addItem = () => {
    axios.post("http://localhost:5000/add", { name: newItem })
      .then(() => {
        setNewItem("");
        setData([...data, { name: newItem }]); // Optimistic update
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  // Delete an item from the database
  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        setData(data.filter((item) => item.id !== id)); // Remove from UI
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Database Items</h1>
      <ul className="list-group mb-3">
        {data.map((item) => (
          <li key={item.id} className="list-group-item">
            {item.name}
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => deleteItem(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
        />
        <button className="btn btn-primary" onClick={addItem}>
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
