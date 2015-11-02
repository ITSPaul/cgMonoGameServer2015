namespace cgMonoGameServer2015.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialGameModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Game",
                c => new
                    {
                        GameID = c.Int(nullable: false, identity: true),
                        GameName = c.String(),
                    })
                .PrimaryKey(t => t.GameID);
            
            CreateTable(
                "dbo.GameScores",
                c => new
                    {
                        ScoreID = c.Int(nullable: false, identity: true),
                        GameID = c.Int(nullable: false),
                        PlayerID = c.String(maxLength: 128),
                        score = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ScoreID)
                .ForeignKey("dbo.Game", t => t.GameID, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.PlayerID)
                .Index(t => t.GameID)
                .Index(t => t.PlayerID);
            
            AddColumn("dbo.AspNetUsers", "XP", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "GamerTag", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GameScores", "PlayerID", "dbo.AspNetUsers");
            DropForeignKey("dbo.GameScores", "GameID", "dbo.Game");
            DropIndex("dbo.GameScores", new[] { "PlayerID" });
            DropIndex("dbo.GameScores", new[] { "GameID" });
            DropColumn("dbo.AspNetUsers", "GamerTag");
            DropColumn("dbo.AspNetUsers", "XP");
            DropTable("dbo.GameScores");
            DropTable("dbo.Game");
        }
    }
}
