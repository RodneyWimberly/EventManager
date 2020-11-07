using AutoMapper;
using EventManager.DataAccess.Events.Models;
using System;


namespace EventManager.Web.ViewModels.Mappers
{
    [Serializable]
    public class MappingConcurrencyException<TSource, TDestination> : AutoMapperMappingException
        where TSource : ApplicationViewModelBase
        where TDestination : EntityBase
    {
        public MappingConcurrencyException(TSource source, TDestination destination) :
            base($"The server version of {typeof(TDestination).Name} has a row version of ({destination.RowVersion.GetString()}) which is different than the client version of {typeof(TSource).Name} which has a row version of ({source.RowVersion.GetString()}).\r\n Please re-query the server to get the latest version!",
                new ArgumentException($"Unable to perform map from {typeof(TSource).Name} to {typeof(TDestination).Name} "),
                new TypePair(typeof(TSource), typeof(TDestination)))
        { }

    }
}
