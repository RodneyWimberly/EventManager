using Microsoft.EntityFrameworkCore;
using System;
using System.Reflection;

namespace EventManager.Identity
{
    public class DbProviderConfiguration
    {
        private readonly string _connectionString;
        public static DbProviderConfiguration With;
        private static readonly string MigrationAssembly = typeof(DbProviderConfiguration).GetTypeInfo().Assembly.GetName().Name;

        public static void Build(string connString)
        {
            if (With is null)
                With = new DbProviderConfiguration(connString);
        }

        public DbProviderConfiguration(string connString) => _connectionString = connString;

        public Action<DbContextOptionsBuilder> SqlServer =>
             options => options.UseSqlServer(_connectionString, sql => sql.MigrationsAssembly(MigrationAssembly));

        public Action<DbContextOptionsBuilder> MySql =>
             options => options.UseMySql(_connectionString, sql => sql.MigrationsAssembly(MigrationAssembly));

        public Action<DbContextOptionsBuilder> Postgre =>
             options => options.UseNpgsql(_connectionString, sql => sql.MigrationsAssembly(MigrationAssembly));

        public Action<DbContextOptionsBuilder> Sqlite =>
            options => options.UseSqlite(_connectionString, sql => sql.MigrationsAssembly(MigrationAssembly));

    }
}