using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace api.data
{
    // The 'EmployeeDbContext' class inherits from 'DbContext', which is the primary class for interacting with the database.
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {

        }

        // DbSet representing the 'Employees' table in the database.
        public DbSet<Employee> Employees { get; set; }

    }

}
