﻿using EventManager.DataAccess.Core.Interfaces;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Linq;

namespace EventManager.Web.Controllers
{
    public class GetIncludeEventArgs<TEntity> : EventArgs
        where TEntity : class, IPrimaryKeyEntity<string>, IAuditableEntity, IConcurrencyTrackingEntity, new()
    {
        public GetIncludeEventArgs(IQueryable<TEntity> entityQuery, string propertyPaths)
        {
            EntityQuery = entityQuery;
            PropertyPaths = propertyPaths;
        }

        public IIncludableQueryable<TEntity, object> Include { get; set; }
        public IQueryable<TEntity> EntityQuery { get; set; }
        public string PropertyPaths { get; set; }
    }
}