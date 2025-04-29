using api.data; // Importing the namespace containing data-related components (likely includes the DbContext).
using backend.Models; // Importing the namespace where the `Employee` model is defined.
using Microsoft.AspNetCore.Mvc; // Provides attributes and classes for building ASP.NET Core MVC applications.
using Microsoft.EntityFrameworkCore; // Entity Framework Core library for database interactions.

// Defining the namespace for the controller.
namespace api.Controllers
{
    [ApiController] // Specifies that this class is an API controller, providing built-in behavior for HTTP requests and responses.
    [Route("api/[controller]")] // Configures the route to be `api/Employee` (controller name is inferred).

    // ControllerBase is the base class for API controllers without views.
    public class EmployeeController : ControllerBase
    {
        // A reference to the database context.
        private readonly EmployeeDbContext dbContext;

        // A reference to the database context.
        public EmployeeController(EmployeeDbContext dbContext)
        {
            // Assigning the injected context to the private field.
            this.dbContext = dbContext;
        }

        // HTTP GET method to retrieve all employees.
        [HttpGet("/")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if (dbContext.Employees == null)
            {
                return NotFound();
            }
            return await dbContext.Employees.ToListAsync(); // Return the list of employees as a response.
        }

        // HTTP GET method to retrieve a specific employee by ID.
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
                return NotFound(); // Return 404 if not found.
            }
            return employee;
        }

        // HTTP POST method to create a new employee.
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee([FromBody] Employee employee)
        {
            dbContext.Employees.Add(employee); // Add the new employee to the DbSet.
            await dbContext.SaveChangesAsync(); // Save the changes to the database.

            // Return a 201 Created response with a location header pointing to the newly created resource.
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.ID }, employee);
        }

        // HTTP PUT method to update an existing employee.
        [HttpPut("{id}")]
        public async Task<ActionResult> PutEmployee(int id, Employee employee)
        {
            // Check if the provided ID matches the employee's ID
            if (id != employee.ID)
            {
                return BadRequest(); // Return 400 Bad Request if the IDs don't match.
            }

            dbContext.Entry(employee).State = EntityState.Modified; // Mark the entity as modified.

            try
            {
                await dbContext.SaveChangesAsync(); // Attempt to save changes.
            }
            catch (DbUpdateConcurrencyException)
            {
                throw; // Re-throw the exception (could be improved with specific error handling).
            }


            return Ok(); // Return 200
        }

        // HTTP DELETE method to remove an employee by ID.
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            // Check if Employees DbSet is null.
            if (dbContext.Employees == null)
            {
                return NotFound(); // Return 404
            }
            var employee = await dbContext.Employees.FindAsync(id); // Find the employee by ID.

            // Check if the employee exists.
            if (employee == null)
            {
                return NotFound(); // Return 404 if not found.
            }

            dbContext.Employees.Remove(employee);  // Remove the employee from the DbSet
            await dbContext.SaveChangesAsync(); // Save the changes to the database.

            return Ok(); // Return 200 OK to indicate successful deletion.
        }
    }
}
