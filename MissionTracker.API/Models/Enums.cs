namespace MissionTracker.API.Models;

public enum MissionStatus
{
    Planned,      // 0
    Active,       // 1
    Completed,    // 2
    Failed        // 3
}

public enum OrbitType
{
    LEO,   // Low Earth Orbit
    MEO,   // Medium Earth Orbit
    GEO,   // Geostationary
    HEO    // Highly Elliptical
}