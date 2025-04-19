import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export default function Update() {

  const { id } = useParams();

  const [editID, setEditID] = useState('');
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editIsActive, setEditIsActive] = useState(0);


  const navigate = useNavigate();

  useEffect(() => {
    handleEdit(id);
  }, [id]);

  const handleEdit = (id) => {
    axios.get(`http://localhost:5150/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditAge(result.data.age);
        setEditIsActive(result.data.isActive);
        setEditID(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Put
  const handleUpdate = (e) => {
    e.preventDefault();
    const url = `http://localhost:5150/api/Employee/${editID}`;

    const data = {
      id: editID,
      name: editName,
      age: editAge,
      isActive: editIsActive ? 1 : 0,
    };

    axios.put(url, data)
      .then((result) => {
        alert('Employee has been updated');
        clear();
        navigate('/');  // Navigate back to home after update
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clear = () => {
    setEditName('');
    setEditAge('');
    setEditIsActive(0);
  };

  return (
    <div>
      <h1>Update Table...</h1>
      <div>
        <form onSubmit={handleUpdate}>
          <label>Name: </label>
          <input
            type='text'
            placeholder='Enter Your Name'
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          /><br />

          <label>Age: </label>
          <input
            type='text'
            placeholder='Enter Your Age'
            value={editAge}
            onChange={(e) => setEditAge(e.target.value)}
          /><br />

          <input
            type="checkbox"
            checked={editIsActive === 1}
            onChange={(e) => setEditIsActive(e.target.checked ? 1 : 0)}
          />
          <label>Is Active</label><br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
