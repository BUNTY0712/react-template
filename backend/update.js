import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);



  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost/react-template/backend/fetch.php');
      if (Array.isArray(response.data)) {
        setItems(response.data);
        console.log('items', items);
      } else {
        console.error('Error fetching data: Response is not an array');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [formData, setFormData] = useState({
    title: '',
    image: null,
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost/react-template/backend/delete.php?id=${id}`);
      console.log(response.data); // Log the response from the backend
      // Filter out the deleted item from the state
      const newItems = items.filter(item => item.id !== id);
      setItems(newItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
}

const handleEdit = async (id) => {
  
}

  useEffect(() => {
    fetchData();
  }, [handleDelete]);
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('description', formData.description);

      const response = await axios.post('http://localhost/react-template/backend/insert.php', formDataToSend);
   fetchData();
      console.log(response.data);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div className="container">
      <h1>CRUD Operations in React</h1>
      <form onSubmit={handleSubmit}>
        <input className="input-field" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
        <input className="input-field" type="file" name="image" onChange={handleImageChange} required />
        <textarea className="input-field" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required></textarea>
        <button className="btn" type="submit">Add Item</button>
      </form>
      <div className="items-container">
      {Array.isArray(items) && items.length > 0 && items.map(item => (
  <div key={item.id} className="item">
    <h3>{item.title}</h3>
    <img src={`http://localhost/react-template/src/upload/${item.image}`} alt={item.title} className="item-image" />
    <p>{item.description}</p>
    
    <div style={{ display: 'flex' }}>
      <button onClick={() => handleEdit(item.id)} className='btn btn-primary'>Edit</button> &nbsp;
      <button onClick={() => handleDelete(item.id)} className='btn btn-danger'>Delete</button>
    </div>
  </div>
))}

       
      </div>
    </div>
  );
};

export default App;
