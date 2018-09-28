using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CoreCapabilityProject.Models
{
    public partial class Orchard5Context : DbContext
    {
        public Orchard5Context()
        {
        }

        public Orchard5Context(DbContextOptions<Orchard5Context> options)
            : base(options)
        {
        }

        public virtual DbSet<MigrationHistory> MigrationHistory { get; set; }
        public virtual DbSet<TblContactUsLog> TblContactUsLog { get; set; }
        public virtual DbSet<TblLocation> TblLocation { get; set; }
        public virtual DbSet<TblOtp> TblOtp { get; set; }
        public virtual DbSet<TblRefferalCodeLog> TblRefferalCodeLog { get; set; }
        public virtual DbSet<TblRideLog> TblRideLog { get; set; }
        public virtual DbSet<TblRidersLog> TblRidersLog { get; set; }
        public virtual DbSet<TblUser> TblUser { get; set; }
        public virtual DbSet<TblUserRating> TblUserRating { get; set; }
        public virtual DbSet<TblVechileLog> TblVechileLog { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=orchardsqlserver.database.windows.net;initial catalog=Orchard5; uid=sqluser5;Password=pwd#Login5");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MigrationHistory>(entity =>
            {
                entity.HasKey(e => new { e.MigrationId, e.ContextKey });

                entity.ToTable("__MigrationHistory");

                entity.Property(e => e.MigrationId).HasMaxLength(150);

                entity.Property(e => e.ContextKey).HasMaxLength(300);

                entity.Property(e => e.Model).IsRequired();

                entity.Property(e => e.ProductVersion)
                    .IsRequired()
                    .HasMaxLength(32);
            });

            modelBuilder.Entity<TblRefferalCodeLog>(entity =>
            {
                entity.Property(e => e.RefferalCode).HasColumnName("Refferal_code");

                entity.Property(e => e.RefferalEmail).HasColumnName("Refferal_email");

                entity.Property(e => e.ReffererEmail).HasColumnName("Refferer_email");

                entity.Property(e => e.ReffererId).HasColumnName("Refferer_id");
            });

            modelBuilder.Entity<TblUser>(entity =>
            {
                entity.Property(e => e.IdProof).HasColumnName("Id_proof");

                entity.Property(e => e.ProfilePic).HasColumnName("Profile_pic");
            });
        }
    }
}
