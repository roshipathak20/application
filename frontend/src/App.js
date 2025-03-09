import React, { useState, useEffect } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap'; // Import Bootstrap components
import axios from 'axios'; // We'll use axios to make HTTP requests

const App = () => {
  const [items, setItems] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    axios.get('http://localhost:5000/items') // Replace with your backend API
      .then(response => {
        setItems(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container>
      <h1>Items List</h1>
      <Button variant="primary" onClick={() => alert('Add Item')}>Add Item</Button>
      <ListGroup>
        {items.map(item => (
          <ListGroup.Item key={item.id}>{item.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default App;
