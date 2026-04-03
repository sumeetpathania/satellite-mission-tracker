namespace MissionTracker.API.Models;

// Inherits Id and CreatedAt from BaseEntity
public class Satellite : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Manufacturer { get; set; } = string.Empty;
    public OrbitType OrbitType { get; set; }
    public double MassKg { get; set; }

    // Navigation: one satellite can have many missions
    public List<Mission> Missions { get; set; } = new();

    // Foreign key: which user owns this satellite
    public int UserId { get; set; }
    public User User { get; set; } = null!;
}