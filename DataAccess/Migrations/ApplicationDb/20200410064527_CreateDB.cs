using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace EventManager.DataAccess.Migrations
{
    public partial class CreateDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Description = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Guests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true),
                    UniqueId = table.Column<string>(maxLength: 25, nullable: false),
                    Prefix = table.Column<string>(maxLength: 10, nullable: true),
                    FirstName = table.Column<string>(maxLength: 100, nullable: false),
                    MiddleName = table.Column<string>(maxLength: 100, nullable: true),
                    LastName = table.Column<string>(maxLength: 100, nullable: false),
                    Suffix = table.Column<string>(maxLength: 10, nullable: true),
                    Sex = table.Column<long>(type: "INTEGER", nullable: false),
                    BirthDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    PhoneNumber = table.Column<string>(maxLength: 20, nullable: true),
                    EmailAddress = table.Column<string>(maxLength: 250, nullable: true),
                    Password = table.Column<string>(maxLength: 100, nullable: false),
                    Address1 = table.Column<string>(maxLength: 250, nullable: true),
                    Address2 = table.Column<string>(maxLength: 250, nullable: true),
                    City = table.Column<string>(maxLength: 100, nullable: true),
                    State = table.Column<string>(maxLength: 2, nullable: true),
                    ZipCode = table.Column<string>(maxLength: 10, nullable: true),
                    EstablishedGuest = table.Column<bool>(type: "INTEGER", nullable: false),
                    Image = table.Column<byte[]>(type: "BLOB", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Logs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    EventId = table.Column<int>(nullable: false),
                    Level = table.Column<int>(nullable: false),
                    Message = table.Column<string>(nullable: true),
                    Name = table.Column<string>(maxLength: 255, nullable: true),
                    TimeStamp = table.Column<DateTimeOffset>(nullable: false),
                    Browser = table.Column<string>(maxLength: 100, nullable: true),
                    Host = table.Column<string>(maxLength: 250, nullable: true),
                    Path = table.Column<string>(maxLength: 250, nullable: true),
                    User = table.Column<string>(maxLength: 100, nullable: true),
                    Method = table.Column<string>(maxLength: 100, nullable: true),
                    StatusCode = table.Column<int>(nullable: false),
                    ServerVariables = table.Column<string>(maxLength: 250, nullable: true),
                    Cookies = table.Column<string>(maxLength: 250, nullable: true),
                    FormVariables = table.Column<string>(maxLength: 250, nullable: true),
                    QueryString = table.Column<string>(maxLength: 250, nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true),
                    Header = table.Column<string>(maxLength: 100, nullable: false),
                    Body = table.Column<string>(maxLength: 250, nullable: false),
                    IsRead = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsPinned = table.Column<bool>(type: "INTEGER", nullable: false),
                    Date = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Description = table.Column<string>(maxLength: 250, nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Description = table.Column<string>(maxLength: 250, nullable: false),
                    ServiceType = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
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
                    JobTitle = table.Column<string>(maxLength: 100, nullable: true),
                    FullName = table.Column<string>(maxLength: 250, nullable: true),
                    Configuration = table.Column<string>(maxLength: 250, nullable: true),
                    IsEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EventLocations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true),
                    EventId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Address1 = table.Column<string>(maxLength: 250, nullable: false),
                    Address2 = table.Column<string>(maxLength: 250, nullable: true),
                    City = table.Column<string>(maxLength: 100, nullable: false),
                    State = table.Column<string>(maxLength: 2, nullable: false),
                    ZipCode = table.Column<string>(maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventLocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventLocations_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleClaims_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventServices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true),
                    EventId = table.Column<int>(nullable: false),
                    ServiceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventServices_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EventServices_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserClaims_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_UserLogins_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_UserTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true),
                    EventId = table.Column<int>(nullable: false),
                    EventLocationId = table.Column<int>(nullable: false),
                    DaysOfTheWeek = table.Column<long>(type: "INTEGER", nullable: false),
                    StartDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    EndDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    StartTime = table.Column<string>(type: "TEXT", maxLength: 8, nullable: false),
                    EndTime = table.Column<string>(type: "TEXT", maxLength: 8, nullable: false),
                    CheckInStartTime = table.Column<string>(type: "TEXT", maxLength: 8, nullable: false),
                    CheckInEndTime = table.Column<string>(type: "TEXT", maxLength: 8, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventSchedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventSchedules_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EventSchedules_EventLocations_EventLocationId",
                        column: x => x.EventLocationId,
                        principalTable: "EventLocations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EventOccurrences",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true),
                    EventId = table.Column<int>(nullable: false),
                    EventLocationId = table.Column<int>(nullable: false),
                    EventScheduleId = table.Column<int>(nullable: false),
                    Date = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    Lead = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventOccurrences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventOccurrences_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EventOccurrences_EventLocations_EventLocationId",
                        column: x => x.EventLocationId,
                        principalTable: "EventLocations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EventOccurrences_EventSchedules_EventScheduleId",
                        column: x => x.EventScheduleId,
                        principalTable: "EventSchedules",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Demerits",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true),
                    GuestId = table.Column<int>(nullable: false),
                    EventOccurrenceId = table.Column<int>(nullable: false),
                    DateTime = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    Description = table.Column<string>(maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Demerits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Demerits_EventOccurrences_EventOccurrenceId",
                        column: x => x.EventOccurrenceId,
                        principalTable: "EventOccurrences",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Demerits_Guests_GuestId",
                        column: x => x.GuestId,
                        principalTable: "Guests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GuestEventOccurrences",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedBy = table.Column<string>(maxLength: 36, nullable: false),
                    UpdatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    CreatedDate = table.Column<string>(type: "TEXT", maxLength: 28, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "BLOB", rowVersion: true, nullable: true),
                    GuestId = table.Column<int>(nullable: false),
                    EventOccurrenceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuestEventOccurrences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GuestEventOccurrences_EventOccurrences_EventOccurrenceId",
                        column: x => x.EventOccurrenceId,
                        principalTable: "EventOccurrences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GuestEventOccurrences_Guests_GuestId",
                        column: x => x.GuestId,
                        principalTable: "Guests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Demerits_EventOccurrenceId",
                table: "Demerits",
                column: "EventOccurrenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Demerits_GuestId",
                table: "Demerits",
                column: "GuestId");

            migrationBuilder.CreateIndex(
                name: "IX_Demerits_Id",
                table: "Demerits",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EventLocations_EventId",
                table: "EventLocations",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventLocations_Id",
                table: "EventLocations",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EventOccurrences_EventId",
                table: "EventOccurrences",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventOccurrences_EventLocationId",
                table: "EventOccurrences",
                column: "EventLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_EventOccurrences_EventScheduleId",
                table: "EventOccurrences",
                column: "EventScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_EventOccurrences_Id",
                table: "EventOccurrences",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_Id",
                table: "Events",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EventSchedules_EventId",
                table: "EventSchedules",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventSchedules_EventLocationId",
                table: "EventSchedules",
                column: "EventLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_EventSchedules_Id",
                table: "EventSchedules",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EventServices_EventId",
                table: "EventServices",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventServices_Id",
                table: "EventServices",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EventServices_ServiceId",
                table: "EventServices",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_GuestEventOccurrences_EventOccurrenceId",
                table: "GuestEventOccurrences",
                column: "EventOccurrenceId");

            migrationBuilder.CreateIndex(
                name: "IX_GuestEventOccurrences_GuestId",
                table: "GuestEventOccurrences",
                column: "GuestId");

            migrationBuilder.CreateIndex(
                name: "IX_GuestEventOccurrences_Id",
                table: "GuestEventOccurrences",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Guests_Id",
                table: "Guests",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Logs_EventId",
                table: "Logs",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Logs_Id",
                table: "Logs",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Logs_Level",
                table: "Logs",
                column: "Level");

            migrationBuilder.CreateIndex(
                name: "IX_Logs_TimeStamp",
                table: "Logs",
                column: "TimeStamp");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_Id",
                table: "Notifications",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RoleClaims_RoleId",
                table: "RoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "Roles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Services_Id",
                table: "Services",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserClaims_UserId",
                table: "UserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogins_UserId",
                table: "UserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "Users",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "Users",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.AddRowVersionTriggers();
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Demerits");

            migrationBuilder.DropTable(
                name: "EventServices");

            migrationBuilder.DropTable(
                name: "GuestEventOccurrences");

            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "RoleClaims");

            migrationBuilder.DropTable(
                name: "UserClaims");

            migrationBuilder.DropTable(
                name: "UserLogins");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "UserTokens");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "EventOccurrences");

            migrationBuilder.DropTable(
                name: "Guests");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "EventSchedules");

            migrationBuilder.DropTable(
                name: "EventLocations");

            migrationBuilder.DropTable(
                name: "Events");
        }
    }
}
