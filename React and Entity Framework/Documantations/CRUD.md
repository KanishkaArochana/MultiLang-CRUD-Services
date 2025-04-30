
## React CRUD Component

This React component implements basic Create, Read, Update, and Delete (CRUD) functionality for managing employee data. It uses React, axios for HTTP requests, react-toastify for notifications, and react-router-dom for navigation.

### Key Features:

#### State Management:

- **data**: Holds the fetched employee data.
- **name, age, isActive**: Hold the input values for adding a new employee.
- **editID, editName, editAge, editIsActive**: Store values for editing an employee.

#### CRUD Operations:

- **Create**: Adds a new employee to the database.
- **Read**: Fetches and displays the list of employees.
- **Update**: Prepares an employee’s data for editing.
- **Delete**: Removes an employee from the database.

#### Notifications:

- Uses toast for success, error, and informational messages to improve user feedback.

#### Navigation:

- Utilizes `useNavigate` to route to the edit page.

#### Form and Table:

- A form for adding employees.
- A table to display employee data with actions for editing and deleting.

### Code Breakdown:

#### 1. State Initialization:

```jsx
const [data, setData] = useState([]);
const [name, setName] = useState('');
const [age, setAge] = useState('');
const [isActive, setIsActive] = useState(0);
const [editID, setEditID] = useState('');
const [editName, setEditName] = useState('');
const [editAge, setEditAge] = useState('');
const [editIsActive, setEditIsActive] = useState(0);
```

These states manage:
- **axios**: For making HTTP requests to the backend API.
- **useEffect & useState (React)**:
  - **useEffect**: Executes side effects (e.g., fetching data on component mount).
  - **useState**: Manages component state.
- **useNavigate**: From `react-router-dom`, for navigation to different routes.
- **toast, ToastContainer**: From `react-toastify`, for displaying notifications.
- **CSS imports**: Includes styles from local and library files.

## State Declarations
- **data**: Stores the list of employees fetched from the backend.
- **name, age, isActive**: Holds form input data for new employees.
- **editID, editName, editAge, editIsActive**: Holds data for the employee being edited.

## Employee Data Array
- **empdata**: Placeholder data that might serve as a local dataset or mock for testing.

## Functions
 **useEffect**
   - **Action**: Fetches data on the initial render by calling `getData`.


#### 2. Fetching Data (`getData`):

```jsx
const getData = () => {
    axios.get('http://localhost:5150/')
        .then((result) => {
            setData(result.data);
            toast.success("Data loaded successfully!");
        })
        .catch((error) => {
            console.log(error);
            toast.error("Failed to load data.");
        });
};
```

**getData**
   - **Action**: Makes a GET request to fetch all employees.
   - **API**: `GET http://localhost:5150/`
   - **On Success**: Updates the `data` state and shows a success toast.
   - **On Failure**: Logs the error and displays an error toast.
#### 3. Editing Data (`handleEdit`):

```jsx
const handleEdit = (id) => {
    axios.get(`http://localhost:5150/${id}`)
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
        });
};
```

 **handleEdit**
   - **Action**: Fetches a specific employee by id and sets the edit-related states.
   - **API**: `GET http://localhost:5150/${id}`
   - **On Success**: Updates the state (`editName`, `editAge`, `editIsActive`, `editID`) with fetched data.
   - **On Failure**: Logs the error and displays an error toast.


#### 4. Deleting Data (`handleDelete`):

```jsx
const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this employee") == true) {
        axios.delete(`http://localhost:5150/api/Employee/${id}`)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Employee has been deleted.");
                    getData();
                }
            })
            .catch((error) => {
                toast.error("Failed to delete the employee.");
            });
    }
};
```

 **handleDelete**
   - **Action**: Deletes an employee by ID.
   - **API**: `DELETE http://localhost:5150/api/Employee/${id}`
   - **Confirmation Dialog**: Ensures user wants to delete.
   - **On Success**: Refreshes the data by calling `getData` and displays a success toast.
   - **On Failure**: Displays an error toast.

#### 5. Creating Data (`hadeleSave`):

```jsx
const hadeleSave = () => {
    const url = 'http://localhost:5150/api/Employee';
    const data = {
        "name": name,
        "age": age,
        "isActive": isActive
    };

    axios.post(url, data)
        .then((result) => {
            getData();
            clear();
            toast.success("Employee has been added.");
            alert("Employee has been added");
        }).catch((error) => {
            console.error(error);
            toast.error("Failed to add the employee.");
        });
};
```

 **hadeleSave**
   - **Action**: Sends a POST request with the new employee details.
   - **API**: `POST http://localhost:5150/api/Employee`
   - **Data**: Sends `{ name, age, isActive }` in the request body.
   - **On Success**: Clears the form, refreshes the table with `getData`, and displays a success toast.
   - **On Failure**: Displays an error toast.

#### 6. Clearing State (`clear`):

```jsx
const clear = () => {
    setName('');
    setAge('');
    setIsActive(0);
    setEditName('');
    setEditAge('');
    setEditIsActive(0);
    setEditID('');
};
```

  - **Action**: Resets all form fields and editing states.

#### 7. navigate
   - **Action**: Used to programmatically navigate to a specific route, e.g., `navigate(/update/${item.id})`.


### Form Section

```jsx
<form>
    <input type='text' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} /><br />
```

- `<form>`: Begins the form section where user inputs are collected.
- `<input type='text'>`: An input field for the user to enter their name.
- `placeholder`: Displays a hint (e.g., "Enter Your Name") inside the input field.
- `value={name}`: Binds the field to the `name` state variable. Any change updates this state.
- `onChange={(e) => setName(e.target.value)}`: Updates the `name` state whenever the user types in the field.

```jsx
    <input type='text' placeholder='Enter Your Age' value={age} onChange={(e) => setAge(e.target.value)} /><br />
```

- `<input type='text'>`: An input field for entering the user's age.
- Similar to the name field, it uses `placeholder`, `value`, and `onChange` to manage and update the `age` state.

```jsx
    <input
        type="checkbox"
        checked={isActive === 1}
        onChange={(e) => setIsActive(e.target.checked ? 1 : 0)}
    />
    <label>IsActivity</label> <br />
```

- `<input type="checkbox">`: A checkbox to toggle the `isActive` state.
- `checked={isActive === 1}`: The checkbox is marked as checked if `isActive` equals 1.
- `onChange={(e) => setIsActive(e.target.checked ? 1 : 0)}`: Updates `isActive` to 1 when checked and 0 when unchecked.
- `<label>`: Displays the label "IsActivity" next to the checkbox.

```jsx
    <button onClick={() => hadeleSave()}>Submit</button>
</form>
```

- `<button>`: A button to submit the form data.
- `onClick={() => hadeleSave()}`: Triggers the `hadeleSave` function when the button is clicked.

### Table Section

```jsx
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
```

- `<table>`: Creates a table for displaying data.
- `border="1"`: Adds a border around table cells.
- `<thead>`: Defines the table header.
- `<tr>`: Represents a row in the header.
- `<th>`: Defines individual header cells for each column (e.g., #, ID, Name).

```jsx
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
```

- `<tbody>`: Contains the table's body rows.
- `data && data.length > 0`: Ensures the `data` array exists and has elements before mapping.
- `data.map((item, index) => {...})`: Iterates over the `data` array to generate a table row for each item.
- `<tr key={index}>`: Creates a row with a unique key for React rendering optimization.
- `<td>`: Defines a cell for each piece of data:
  - `index + 1`: Displays the row number.
  - `item.id`, `item.name`, `item.age`, `item.isActive`: Shows data properties.

```jsx
                            <button onClick={() => {
                                navigate(`/update/${item.id}`);
                                handleEdit(item.id);
                            }}>
                                Edit
                            </button>
                            &nbsp;
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
```

- **Edit Button**:
  - `onClick={() => { navigate(/update/${item.id}); handleEdit(item.id); }}`:
    - Navigates to the edit page for the selected item using `navigate`.
    - Calls `handleEdit` to perform any additional edit actions.
- **Delete Button**:
  - `onClick={() => handleDelete(item.id)}`: Deletes the selected item by calling `handleDelete`.

```jsx
                        </td>
                    </tr>
                )
            })
            :
            'Loading...'
    }
</tbody>
```

- `</tbody>`: If `data` is empty or undefined, displays "Loading...".

### ToastContainer

```jsx
<ToastContainer />
```

- `ToastContainer`: Displays notifications (e.g., success or error messages). Likely part of the `react-toastify` library.


## UI and Rendered Components

1. **ToastContainer**
   - Displays toast notifications (success, error, etc.).

2. **Form**
   - **Fields**:
     - Text inputs for `name` and `age`.
     - Checkbox for `isActive`.
   - **Submit Button**: Calls `hadeleSave`.

3. **Table**
   - **Headers**: Includes ID, Name, Age, IsActive, and Actions.
   - **Rows**:
     - Loops over `data` to display each employee.
   - **Actions**:
     - **Edit**: Navigates to an update route and calls `handleEdit`.
     - **Delete**: Deletes the employee using `handleDelete`.

## Potential Documentation Sections
### Overview
- **Purpose**: Managing employee data.

### Setup
- **Installation**: Dependencies like `axios`, `react-toastify`, etc.
- **API URL configuration**: Mention where the API endpoints are expected.

### State Management
- **Explanation**: Use of `useState` for maintaining form data and fetched data.

### API Interactions
- **Overview**: API endpoints used (`GET`, `POST`, `DELETE`).
- **Communication**: How the component communicates with the backend.

### Form Handling
- **Details**: Controlled components (value and `onChange`).

### Error Handling
- **Use of toast**: For error/success messages.

### Styling
- **Mention**: Use of local and external CSS files.

### Testing
- **Mock data**: `empdata` for local testing without an API.






