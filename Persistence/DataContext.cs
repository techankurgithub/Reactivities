using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // we will create here the 'DB set' which represents the table
        public DbSet<Activity> Activities { get; set; }
    }    
}