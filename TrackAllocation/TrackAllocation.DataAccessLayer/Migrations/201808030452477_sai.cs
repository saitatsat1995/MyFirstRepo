namespace TrackAllocation.DataAccessLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class sai : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblLocation",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LocationName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.trackDetails",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Mid = c.Int(nullable: false),
                        Location1 = c.String(),
                        Location2 = c.String(),
                        Location3 = c.String(),
                        Track = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.trackDetails");
            DropTable("dbo.tblLocation");
        }
    }
}
