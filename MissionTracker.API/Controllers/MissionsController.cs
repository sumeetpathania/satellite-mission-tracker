using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MissionTracker.API.Data;
using MissionTracker.API.DTOs;
using MissionTracker.API.Models;

namespace MissionTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MissionsController : ControllerBase
{
    private readonly AppDbContext _db;

    public MissionsController(AppDbContext db) => _db = db;

    private int UserId =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var missions = await _db.Missions
            .Where(m => m.UserId == UserId)
            .Include(m => m.Satellite)
            .Select(m => new MissionResponseDto(
                m.Id, m.Name, m.Description,
                m.Status, m.LaunchDate, m.CreatedAt,
                m.Satellite.Name))
            .ToListAsync();

        return Ok(missions);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateMissionDto dto)
    {
        // Verify the satellite belongs to this user
        var satellite = await _db.Satellites
            .FirstOrDefaultAsync(s => s.Id == dto.SatelliteId && s.UserId == UserId);

        if (satellite == null) return BadRequest("Satellite not found");

        var mission = new Mission
        {
            Name = dto.Name,
            Description = dto.Description,
            SatelliteId = dto.SatelliteId,
            LaunchDate = dto.LaunchDate,
            UserId = UserId
        };

        _db.Missions.Add(mission);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new { id = mission.Id },
            new MissionResponseDto(mission.Id, mission.Name,
                mission.Description, mission.Status,
                mission.LaunchDate, mission.CreatedAt,
                satellite.Name));
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, UpdateMissionStatusDto dto)
    {
        var mission = await _db.Missions
            .FirstOrDefaultAsync(m => m.Id == id && m.UserId == UserId);

        if (mission == null) return NotFound();

        mission.Status = dto.Status;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var mission = await _db.Missions
            .FirstOrDefaultAsync(m => m.Id == id && m.UserId == UserId);

        if (mission == null) return NotFound();

        _db.Missions.Remove(mission);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}