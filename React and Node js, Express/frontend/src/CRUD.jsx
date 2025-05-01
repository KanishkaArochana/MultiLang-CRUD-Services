// Import required libraries and styles
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './Style/CRUD.css'
import 'react-toastify/dist/ReactToastify.css';

export default function CRUD() {

  // State variables for employee data and form inputs
    const [data, setData] = useState([]); // To store the list of employees

    const [name, setName] = useState(''); // For new employee name
    const [age, setAge] = useState(''); // For new employee age
    const [isActive, setIsActive] = useState(0); // For new employee active status

    const [editID, setEditID] = useState(''); // ID of the employee being edited
    const [editName, setEditName] = useState(''); // Name of the employee being edited
    const [editAge, setEditAge] = useState(''); // Age of the employee being edited
    const [editIsActive, setEditIsActive] = useState(0); // Active status of the employee being edited

    const navigate = useNavigate(); // For programmatic navigation

    const empdata = [
        {
            id: 1,
            name: "Kanishka",
            age: 24,
            isActive: 1
        },

        {
            id: 2,
            name: "Lahiru",
            age: 23,
            isActive: 1
        },

        {
            id: 3,
            name: "Nuwan",
            age: 24,
            isActive: 0
        },

        {
            id: 4,
            name: "Ravidu",
            age: 25,
            isActive: 1
        }
    ]

 // Fetch data on component mount
    useEffect(() => {
        getData();
    }, [])

 // Function to fetch all employee data
    const getData = () => {
        axios.get('http://localhost:3001/api/users')
            .then((result) => {
                setData(result.data.response); // Update the state with fetched data
                toast.success("Data loaded successfully!"); // Success notification
                console.log(result.data.response);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to load data."); // Error notification
            })
    }

// Function to fetch a specific employee's data for editing
    const handleEdit = (id) => {
        // handleShow();
        axios.post(`http://localhost:3001/api/updateuser/${id}`) //Get one ${id}
            .then((result) => {
                setEditName(result.data.name);
                setEditAge(result.data.age);
                setEditIsActive(result.data.isActive);
                setEditID(id);
                toast.info("Employee data loaded for editing.");
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to load employee data.");
            })

    }

    // Function to delete an employee
    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this employee") == true) {
            axios.post(`http://localhost:3001/api/deleteuser?id=${id}`)
                .then((result) => {
                    if (result.status === 200) {
                        // alert('Employee has been delete');
                        toast.success("Employee has been deleted.");
                        getData();
                    }
                })
                .catch((error) => {
                    toast.error(error);
                    toast.error("Failed to delete the employee.");
                })
        }
    }

// Function to save a new employee
    const hadeleSave = () => {
        const url = 'http://localhost:3001/api/createuser';
        const data = {

            "name": name,
            "age": age,
            "isActive": isActive
        }

        axios.post(url, data)
            .then((result) => {
                getData(); // Refresh data
                clear(); // Clear the form
                
                toast.success("Employee has been added.");
                alert("Employee has been added"); // Alert user
            }).catch((error) => {
                console.error(error);
                toast.error("Failed to add the employee.");
            })
    }

// Function to clear the form fields
    const clear = () => {
        setName('');
        setAge('');
        setIsActive(0);
        setEditName('');
        setEditAge('');
        setEditIsActive(0);
        setEditID('');

    }

    // const handleEditClick = () => {
    //     navigate(`/update`);
    // };

    return (
        <div>
            <ToastContainer /> {/* Container for displaying notifications */}
            <h2>React Form & Table</h2>

 {/* Form for adding a new employee */}
            <form>
                <input type='text' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} /><br />
                <input type='text' placeholder='Enter Your Age' value={age} onChange={(e) => setAge(e.target.value)} /><br />
                <input
                    type="checkbox"
                    checked={isActive === 1}
                    onChange={(e) => setIsActive(e.target.checked ? 1 : 0)}
                /><label>IsActivity</label> <br />
                <button onClick={() => hadeleSave()}>Submit</button>
            </form>



            <table border="1">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>IsActive</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                        <td>{item.isActive}</td>
                                        <td>
                                            <button onClick={() => {
                                                navigate(`/update/${item.id}`);
                                                handleEdit(item.id);
                                            }}>
                                                Edit
                                            </button>

                                            &nbsp;
                                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                                            {/* <button onClick={() => handleEdit(item.id)} >Edit </button> */}

                                        </td>
                                    </tr>
                                )
                            })
                            :
                            'Loading...'
                    }

                </tbody>
            </table>

        </div>
    );
}

