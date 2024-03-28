import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [editing,setEditing] = useState(true);
  const [selectItem, setSelectItem] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);
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
    description: '',
    gender: '', // Add gender state
    color: ''   // Add color state
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

const handleEdit = async (e) => {
  setEditing(!editing)
  e.preventDefault(); // Prevent default form submission behavior
  if (!selectItem) {
    console.error('No item selected for editing.');
    return;
  }

  try {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('gender', formData.gender); // Include gender value
    formDataToSend.append('color', formData.color);   // Include color value

    const response = await axios.post(`http://localhost/react-template/backend/edit.php?id=${selectItem}`, formDataToSend);
    setItems(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('gender', formData.gender); // Include gender
    formDataToSend.append('color', formData.color);   // Include color

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
      {editing ? (

<form>
<input className="input-field" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
<input className="input-field" type="file" name="image" onChange={handleImageChange} required />
<textarea className="input-field" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required></textarea>
<div>
  Select Gender:
  <label htmlFor="male"> Male</label> <input type="radio" name="gender" value="male" onChange={handleInputChange} id="male" />
  <label htmlFor="female"> Female</label> <input type="radio" name="gender" value="female" onChange={handleInputChange} id="female" />
</div>
<div>
  Select Color:
  <select className='form-control' name="color" id="colors" onChange={handleInputChange}>
    <option value="" disabled selected>Select Color</option>
    <option value="red">Red</option>
    <option value="blue">Blue</option>
  </select>
</div>
<button style={{ marginTop: "15px" }} onClick={handleSubmit} className="btn" type="submit">Add Item</button>
</form>
      ) : (
        <form>
        <input className="input-field" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
        <input className="input-field" type="file" name="image" onChange={handleImageChange} required />
        <textarea className="input-field" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required></textarea>
        <div>
          Select Gender:
          <label htmlFor="male"> Male</label> 
          <input type="radio" name="gender" value="male" onChange={handleInputChange} id="male" />
          <label htmlFor="female"> Female</label> 
          <input type="radio" name="gender" value="female" onChange={handleInputChange} id="female" />
        </div>
        <div>
          Select Color:
          <select className='form-control' name="color" id="colors" onChange={handleInputChange}>
            <option value="" disabled>Select Color</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <button onClick={handleEdit} className="btn" type="submit">Update Item</button>
      </form>
      
      )}
      <div className="items-container">
      {Array.isArray(items) && items.length > 0 && items.map(item => (
  <div key={item.id} className="item">
    <h3>{item.title}</h3>
    <img src={`http://localhost/react-template/src/upload/${item.image}`} alt={item.title} className="item-image" />
    <p>{item.description}</p>
    <p>{item.gender}</p>
    <p>{item.color}</p>


    
    <div style={{ display: 'flex' }}>
    
      <button onClick={() => {
        setSelectItem(item.id);
        setEditing(false);
        setFormData(item);
      }} className='btn btn-primary'>Edit</button> &nbsp;
      <button onClick={() => handleDelete(item.id)} className='btn btn-danger'>Delete</button>
    </div>
  </div>
))}
      </div>
    </div>
  );
};

export default Dashboard;
