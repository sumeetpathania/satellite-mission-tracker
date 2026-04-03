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
public class SatellitesController : ControllerBase
{
    private readonly AppDbContext _db;

    public SatellitesController(AppDbContext db) => _db = db;

    private int UserId =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var satellites = await _db.Satellites
            .Where(s => s.UserId == UserId)
            .Include(s => s.Missions)
            .Select(s => new SatelliteResponseDto(
                s.Id, s.Name, s.Manufacturer,
                s.OrbitType, s.MassKg, s.CreatedAt,
                s.Missions.Count))
            .ToListAsync();

        return Ok(satellites);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateSatelliteDto dto)
    {
        var satellite = new Satellite
        {
            Name = dto.Name,
            Manufacturer = dto.Manufacturer,
            OrbitType = dto.OrbitType,
            MassKg = dto.MassKg,
            UserId = UserId
        };

        _db.Satellites.Add(satellite);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new { id = satellite.Id },
            new SatelliteResponseDto(satellite.Id, satellite.Name,
                satellite.Manufacturer, satellite.OrbitType,
                satellite.MassKg, satellite.CreatedAt, 0));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var satellite = await _db.Satellites
            .FirstOrDefaultAsync(s => s.Id == id && s.UserId == UserId);

        if (satellite == null) return NotFound();

        _db.Satellites.Remove(satellite);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}