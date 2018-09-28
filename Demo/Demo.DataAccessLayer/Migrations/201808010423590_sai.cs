namespace Demo.DataAccessLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class sai : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblBook",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        name = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblBook");
        }
    }
}
