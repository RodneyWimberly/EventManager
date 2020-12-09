﻿using EventManager.Core;
using EventManager.DataAccess.Core.Interfaces;
using EventManager.DataAccess.Events;
using EventManager.DataAccess.Events.Models;
using IdentityServer4.EntityFramework.DbContexts;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace EventManager.DataAccess.Extensions
{
    public static class DbContextExtensions
    {
        public static bool AllMigrationsApplied(this DbContext context)
        {
            IEnumerable<string> applied = context.GetService<IHistoryRepository>()
                .GetAppliedMigrations()
                .Select(m => m.MigrationId);


            IEnumerable<string> total = context.GetService<IMigrationsAssembly>()
                .Migrations
                .Select(m => m.Key);

            return !total.Except(applied).Any();
        }

        public static async Task SeedEventDbEntityAsync<T>(this EventDbContext context, IQueryable<EntityBase> entities, ILogger logger = null) where T : EntityBase
        {
            string seedFile = Path.Combine(AppContext.BaseDirectory, "Seed", "EventDB", $"{typeof(T).Name}.json");
            if (File.Exists(seedFile) && !(await entities.ToListAsync()).Any())
            {
                string name = $"{context.GetType().Name}::{typeof(T).Name}";
                logger?.LogInformation($"Seeding {name} with {seedFile}");
                List<T> seedEntities = JsonConvert.DeserializeObject<List<T>>(await File.ReadAllTextAsync(seedFile));
                await context.AddRangeAsync(seedEntities);
                await context.SaveChangesAsync();
                logger?.LogInformation($"Seeding of {name} has completed!");
            }
        }

    }
}
