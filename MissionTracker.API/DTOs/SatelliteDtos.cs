using MissionTracker.API.Models;

namespace MissionTracker.API.DTOs;

public record CreateSatelliteDto(
    string Name,
    string Manufacturer,
    OrbitType OrbitType,
    double MassKg
);

public record SatelliteResponseDto(
    int Id,
    string Name,
    string Manufacturer,
    OrbitType OrbitType,
    double MassKg,
    DateTime CreatedAt,
    int MissionCount
);