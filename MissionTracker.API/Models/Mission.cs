namespace MissionTracker.API.Models;

public class Mission : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public MissionStatus Status { get; set; } = MissionStatus.Planned;
    public DateTime? LaunchDate { get; set; }

    // Foreign key: which satellite is assigned
    public int SatelliteId { get; set; }
    public Satellite Satellite { get; set; } = null!;

    public int UserId { get; set; }
    public User User { get; set; } = null!;
}