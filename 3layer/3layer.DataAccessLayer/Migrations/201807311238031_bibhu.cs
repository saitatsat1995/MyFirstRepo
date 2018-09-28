namespace _3layer.DataAccessLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class bibhu : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tblBookStore",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tblBookStore");
        }
    }
}
