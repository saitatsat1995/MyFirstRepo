namespace MyTest.DataAccessLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class sai1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.tblBook", "Subject", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.tblBook", "Subject");
        }
    }
}
