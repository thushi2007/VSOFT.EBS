using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VSOFT.EBS.BO.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VS_Z_AspNetRole",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VS_Z_AspNetRole", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VS_Z_AspNetUser",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    OwnerId = table.Column<Guid>(nullable: true),
                    Active = table.Column<bool>(nullable: true),
                    Blocked = table.Column<bool>(nullable: true),
                    CreationDate = table.Column<DateTime>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: true),
                    Creator = table.Column<string>(nullable: true),
                    Modifier = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VS_Z_AspNetUser", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VS_Z_AspNetRoleClaim",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<Guid>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VS_Z_AspNetRoleClaim", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VS_Z_AspNetRoleClaim_VS_Z_AspNetRole_RoleId",
                        column: x => x.RoleId,
                        principalTable: "VS_Z_AspNetRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VS_Z_AspNetUserClaim",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VS_Z_AspNetUserClaim", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VS_Z_AspNetUserClaim_VS_Z_AspNetUser_UserId",
                        column: x => x.UserId,
                        principalTable: "VS_Z_AspNetUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VS_Z_AspNetUserLogin",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VS_Z_AspNetUserLogin", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_VS_Z_AspNetUserLogin_VS_Z_AspNetUser_UserId",
                        column: x => x.UserId,
                        principalTable: "VS_Z_AspNetUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VS_Z_AspNetUserRole",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    RoleId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VS_Z_AspNetUserRole", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_VS_Z_AspNetUserRole_VS_Z_AspNetRole_RoleId",
                        column: x => x.RoleId,
                        principalTable: "VS_Z_AspNetRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VS_Z_AspNetUserRole_VS_Z_AspNetUser_UserId",
                        column: x => x.UserId,
                        principalTable: "VS_Z_AspNetUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VS_Z_AspNetUserToken",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VS_Z_AspNetUserToken", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_VS_Z_AspNetUserToken_VS_Z_AspNetUser_UserId",
                        column: x => x.UserId,
                        principalTable: "VS_Z_AspNetUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "VS_Z_AspNetRole",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_VS_Z_AspNetRoleClaim_RoleId",
                table: "VS_Z_AspNetRoleClaim",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "VS_Z_AspNetUser",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "VS_Z_AspNetUser",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_VS_Z_AspNetUserClaim_UserId",
                table: "VS_Z_AspNetUserClaim",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_VS_Z_AspNetUserLogin_UserId",
                table: "VS_Z_AspNetUserLogin",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_VS_Z_AspNetUserRole_RoleId",
                table: "VS_Z_AspNetUserRole",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VS_Z_AspNetRoleClaim");

            migrationBuilder.DropTable(
                name: "VS_Z_AspNetUserClaim");

            migrationBuilder.DropTable(
                name: "VS_Z_AspNetUserLogin");

            migrationBuilder.DropTable(
                name: "VS_Z_AspNetUserRole");

            migrationBuilder.DropTable(
                name: "VS_Z_AspNetUserToken");

            migrationBuilder.DropTable(
                name: "VS_Z_AspNetRole");

            migrationBuilder.DropTable(
                name: "VS_Z_AspNetUser");
        }
    }
}
