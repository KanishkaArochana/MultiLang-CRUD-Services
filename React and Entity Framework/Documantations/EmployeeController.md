# EmployeeController Documentation
The EmployeeController is a RESTful API controller in ASP.NET Core that manages CRUD operations for the Employee entity. It interacts with a database using Entity Framework Core and provides endpoints for the following operations:

## Namespace and Imports

```csharp
using api.data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
```

- `using api.data;`: Imports the namespace containing the application's data layer (e.g., EmployeeDbContext).
- `using backend.Models;`: Imports the namespace containing the Employee model class.
- `using Microsoft.AspNetCore.Mvc;`: Provides classes and attributes for building RESTful APIs in ASP.NET Core.
- `using Microsoft.EntityFrameworkCore;`: Provides functionality to interact with the database using Entity Framework Core.

## Controller Declaration

```csharp
namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
```

- `namespace api.Controllers`: Defines the namespace for the EmployeeController.
- `[ApiController]`: Indicates that the class is an API controller, enabling automatic model validation and other API-specific behaviors.
- `[Route("api/[controller]")]`: Specifies the base route for this controller. The `[controller]` placeholder automatically uses the controller's name (EmployeeController) minus the "Controller" suffix (api/employee).

## Dependency Injection

**Definition**: Dependency Injection (DI) is a design pattern used to achieve inversion of control (IoC) in object-oriented programming. It allows a class to receive its dependencies (e.g., services or objects it needs to function) from an external source rather than creating them itself.

**Key Points**:
- **Purpose**: To reduce tight coupling between components, making the code more modular, testable, and maintainable.
- **Mechanism**: A dependency (e.g., a database context or a service) is "injected" into a class, typically via the constructor, a property, or a method.

**ASP.NET Core Implementation**:
- ASP.NET Core has a built-in DI container.
- Dependencies like DbContext or custom services are registered in the Startup.cs or Program.cs file using methods like AddScoped, AddSingleton, or AddTransient.


```csharp
private readonly EmployeeDbContext dbContext;

public EmployeeController(EmployeeDbContext dbContext)
{
    this.dbContext = dbContext;
}
```

- `private readonly EmployeeDbContext dbContext;`: Declares a private field to store the database context instance.
- `public EmployeeController(EmployeeDbContext dbContext)`: Constructor that injects the EmployeeDbContext dependency.

## GET: Retrieve All Employees

```csharp
[HttpGet("/")]
public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
{
    if (dbContext.Employees == null)
    {
        return NotFound();
    }
    return await dbContext.Employees.ToListAsync();
}
```

- `[HttpGet("/")]`: Maps this method to a GET request at the root endpoint (e.g., api/employee/).
- `Task<ActionResult<IEnumerable<Employee>>>`: Specifies the return type as a list of Employee objects wrapped in an ActionResult.

### `Task<ActionResult<IEnumerable<Employee>>>`

**Definition**: This is the return type of an asynchronous method in ASP.NET Core that:
- Uses a Task to indicate it will run asynchronously.
- Returns an ActionResult that encapsulates:
  - A response with a status code (e.g., 200 OK, 404 Not Found).
  - A result of type IEnumerable<Employee> (a collection of Employee objects).

**Breakdown**:

**Task**:
- Represents an asynchronous operation.
- When the method runs, it does not block the thread but instead runs asynchronously. The await keyword is used to indicate the point at which the asynchronous task completes.
- Example: Task is used here because database queries (like ToListAsync) are asynchronous.

**ActionResult**:
- Represents an HTTP response with a status code and optional data.
- Allows flexibility: You can return data (IEnumerable<Employee>) or error responses (NotFound).

**IEnumerable<Employee>**:
     - The data type being returned, a collection of Employee objects.

- `if (dbContext.Employees == null)`: Checks if the Employees table is null, indicating no database connection or table definition.
- `return await dbContext.Employees.ToListAsync();`: Asynchronously fetches all employees from the database.

## GET: Retrieve Employee by ID

```csharp
[HttpGet("/{id}")]
public async Task<ActionResult<Employee>> GetEmployee(int id)
{
    if (dbContext.Employees == null)
    {
        return NotFound();
    }
    var employee = await dbContext.Employees.FindAsync(id);
    if (employee == null)
    {
        return NotFound();
    }
    return employee;
}
```

- `[HttpGet("/{id}")]`: Maps this method to a GET request at /api/employee/{id}.
- `int id`: Represents the employee ID passed as a route parameter.
- `FindAsync(id)`: Searches for an employee with the specified ID in the database.
- `if (employee == null)`: Returns NotFound if no employee matches the ID.

## POST: Add a New Employee

```csharp
[HttpPost]
public async Task<ActionResult<Employee>> PostEmployee([FromBody]Employee employee)
{
    dbContext.Employees.Add(employee);
    await dbContext.SaveChangesAsync();

    return CreatedAtAction(nameof(GetEmployee), new { id = employee.ID }, employee);
}
```

- `[HttpPost]`: Maps this method to a POST request (e.g., api/employee).
- `[FromBody]`: Indicates that the employee object is sent in the request body.
- `dbContext.Employees.Add(employee)`: Adds the new employee to the database context.
- `await dbContext.SaveChangesAsync()`: Saves the changes asynchronously.
- `CreatedAtAction`: Returns a 201 status with the location of the newly created employee resource.

## PUT: Update an Existing Employee

```csharp
[HttpPut("{id}")]
public async Task<ActionResult> PutEmployee(int id, Employee employee)
{
    if (id != employee.ID)
    {
        return BadRequest();
    }

    dbContext.Entry(employee).State = EntityState.Modified;
    
    try
    {
        await dbContext.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        throw;
    }

    return Ok();
}
```

- `[HttpPut("{id}")]`: Maps this method to a PUT request at /api/employee/{id}.
- `int id, Employee employee`: Accepts the employee ID and updated employee data.
- `if (id != employee.ID)`: Validates that the route ID matches the ID in the request body.
- `dbContext.Entry(employee).State = EntityState.Modified;`: Marks the entity as modified.
- `DbUpdateConcurrencyException`: Catches concurrency issues during the database update.

## DELETE: Remove an Employee

```csharp
[HttpDelete("{id}")]
public async Task<ActionResult> DeleteEmployee(int id)
{
    if(dbContext.Employees == null)
    {
        return NotFound();
    }
    var employee = await dbContext.Employees.FindAsync(id);
    if(employee == null)
    {
        return NotFound();
    }
    dbContext.Employees.Remove(employee);
    await dbContext.SaveChangesAsync();

    return Ok();
}
```

- `[HttpDelete("{id}")]`: Maps this method to a DELETE request at /api/employee/{id}.
- `FindAsync(id)`: Locates the employee with the given ID.
- `dbContext.Employees.Remove(employee)`: Marks the employee for deletion.
- `await dbContext.SaveChangesAsync()`: Saves the changes asynchronously.
- `return Ok()`: Returns a 200 status after successful deletion.


## EmployeeController Summary

### Retrieve All Employees (GET /api/employee/)
Returns a list of all employees from the database. If the employee table is not available, it responds with 404 Not Found.

### Retrieve a Single Employee by ID (GET /api/employee/{id})
Fetches details of a specific employee based on their ID. Returns 404 Not Found if the employee is not found.

### Create a New Employee (POST /api/employee)
Accepts employee details in the request body, adds them to the database, and returns a 201 Created response with the location of the new employee resource.

### Update an Existing Employee (PUT /api/employee/{id})
Updates the details of an employee with the specified ID. Validates that the ID in the route matches the ID in the request body. Handles concurrency issues and returns a 200 OK on success.

### Delete an Employee (DELETE /api/employee/{id})
Deletes an employee record based on the provided ID. If the employee does not exist, it returns 404 Not Found. Responds with 200 OK after successful deletion.

## Key Features

### Dependency Injection
The controller uses dependency injection to access the database through the EmployeeDbContext.
- **Purpose**: This ensures loose coupling and makes the application easier to test and maintain.
- **Example**:
    ```csharp
    public EmployeeController(EmployeeDbContext dbContext)
    {
        this.dbContext = dbContext;
    }
    ```

### Asynchronous Operations
All database interactions are asynchronous, using methods like ToListAsync(), FindAsync(), and SaveChangesAsync().
- **Purpose**: Improves performance by avoiding blocking threads, especially for I/O operations like database queries.
- **Example**:
    ```csharp
    return await dbContext.Employees.ToListAsync();
    ```

### Validation
The controller validates input to ensure safe and meaningful operations:
- Checks if the Employees table or a specific employee exists before performing actions.
- Verifies that the id in the route matches the ID in the request body for updates.
- **Purpose**: Prevents invalid requests and ensures data integrity.
- **Example**:
    ```csharp
    if (id != employee.ID)
    {
        return BadRequest();
    }
    ```

### Error Handling
Handles potential errors gracefully, such as:
- **Resource Not Found**: Responds with 404 Not Found when a requested employee or the Employees table does not exist.
- **Concurrency Issues**: Catches DbUpdateConcurrencyException when there are conflicting updates in the database.
- **Purpose**: Enhances user experience by providing clear feedback on errors.
- **Example**:
    ```csharp
    catch (DbUpdateConcurrencyException)
    {
        throw;
    }
    ```

### RESTful API Design
Follows REST principles by providing clear and consistent endpoints for CRUD operations:
- **GET**: Fetches resources (GetEmployees, GetEmployee).
- **POST**: Creates a new resource (PostEmployee).
- **PUT**: Updates an existing resource (PutEmployee).
- **DELETE**: Deletes a resource (DeleteEmployee).
- **Purpose**: Makes the API intuitive and easy to use for clients.
- **Example of Endpoint Mapping**:
    ```csharp
    [HttpGet("/")] // Root endpoint for fetching all employees
    [HttpGet("/{id}")] // Fetch a specific employee by ID
    ```

### Status Code Responses
Provides appropriate HTTP status codes for different scenarios:
- **200 OK**: For successful operations like retrieval, update, or deletion.
- **201 Created**: After successfully creating a new employee.
- **400 Bad Request**: For invalid inputs or mismatched IDs.
- **404 Not Found**: When the requested resource is unavailable.
- **Purpose**: Ensures the API adheres to HTTP standards and communicates clearly with clients.
- **Example**:
    ```csharp
    if (employee == null)
    {
        return NotFound();
    }
    ```

### Database Interactions
Leverages Entity Framework Core for all database operations:
- **Add**: Adds a new employee to the database.
- **Find**: Searches for employees by ID.
- **Remove**: Deletes an employee from the database.
- **State Management**: Tracks changes to entities for updates.
- **Purpose**: Simplifies data access and eliminates the need for manual SQL queries.
- **Example**:
    ```csharp
    dbContext.Entry(employee).State = EntityState.Modified;
    ```

### Model Binding
Uses model binding to map incoming JSON data to the Employee object in methods like PostEmployee and PutEmployee.
- **Purpose**: Simplifies data handling by automatically converting HTTP request payloads into C# objects.
- **Example**:
    ```csharp
    public async Task<ActionResult<Employee>> PostEmployee([FromBody] Employee employee)
    ```
