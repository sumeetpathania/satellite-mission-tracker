using Microsoft.EntityFrameworkCore;
using MissionTracker.API.Models;

namespace MissionTracker.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Satellite> Satellites => Set<Satellite>();
    public DbSet<Mission> Missions => Set<Mission>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Satellite belongs to User
        modelBuilder.Entity<Satellite>()
            .HasOne(s => s.User)
            .WithMany(u => u.Satellites)
            .HasForeignKey(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Mission belongs to Satellite
        modelBuilder.Entity<Mission>()
            .HasOne(m => m.Satellite)
            .WithMany(s => s.Missions)
            .HasForeignKey(m => m.SatelliteId)
            .OnDelete(DeleteBehavior.Restrict);

        // Mission belongs to User
        modelBuilder.Entity<Mission>()
            .HasOne(m => m.User)
            .WithMany(u => u.Missions)
            .HasForeignKey(m => m.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();
    }
}