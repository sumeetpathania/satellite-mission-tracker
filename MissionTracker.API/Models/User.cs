namespace MissionTracker.API.Models;

public class User : BaseEntity
{
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    public List<Satellite> Satellites { get; set; } = new();
    public List<Mission> Missions { get; set; } = new();
}