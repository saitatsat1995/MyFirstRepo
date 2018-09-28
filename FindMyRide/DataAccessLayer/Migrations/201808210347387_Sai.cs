namespace DataAccessLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Sai : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TblUser",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Fname = c.String(),
                        Lname = c.String(),
                        Email = c.String(),
                        Pass = c.String(),
                        Mobile = c.String(),
                        Address = c.String(),
                        Pin = c.Int(nullable: false),
                        City = c.String(),
                        State = c.String(),
                        Country = c.String(),
                        IsVerified = c.Int(nullable: false),
                        Dob = c.String(),
                        Gender = c.String(),
                        Profile_pic = c.String(),
                        Id_proof = c.String(),
                        Rating = c.Int(nullable: false),
                        Role = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TblUser");
        }
    }
}