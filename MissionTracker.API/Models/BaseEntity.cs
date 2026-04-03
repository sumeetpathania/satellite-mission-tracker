namespace MissionTracker.API.Models;

// Abstract: cannot create a "BaseEntity" directly
// Forces all entities to have Id and CreatedAt
public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}