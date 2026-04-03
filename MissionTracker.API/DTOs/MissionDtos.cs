using MissionTracker.API.Models;

namespace MissionTracker.API.DTOs;

public record CreateMissionDto(
    string Name,
    string Description,
    int SatelliteId,
    DateTime? LaunchDate
);

public record UpdateMissionStatusDto(MissionStatus Status);

public record MissionResponseDto(
    int Id,
    string Name,
    string Description,
    MissionStatus Status,
    DateTime? LaunchDate,
    DateTime CreatedAt,
    string SatelliteName
);