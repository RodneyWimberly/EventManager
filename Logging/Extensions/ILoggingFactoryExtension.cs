namespace EventManager.Logging.ServiceClient.Extensions
{
    using EventManager.Logging.ServiceClient.Logger;
    #region Usings

    using Microsoft.Extensions.Logging;
    using System;

    #endregion

    /// <summary>
    /// Extension methods for the <see cref="Microsoft.Extensions.Logging.ILoggerFactory"/> class.
    /// </summary>
    public static class ILoggingFactoryExtension
    {
        #region Public Methods

        /// <summary>
        /// Adds an entity framework logger that is enabled for <see cref="Microsoft.Extensions.Logging.LogLevel"/>.Information or
        /// higher.
        /// </summary>
        /// <param name="factory">
        /// The extension method argument.
        /// </param>
        /// <param name="serviceProvider">
        /// The service provider for dependency injection.
        /// </param>
        /// <param name="url">
        /// The url of the service
        /// </param>
        /// <typeparam name="TLogger">
        /// The type of the entity framework logger class used to log.
        /// </typeparam>
        public static ILoggerFactory AddServiceClient<TLogger>(
            this ILoggerFactory factory,
            IServiceProvider serviceProvider,
            string url = null)
        {
            return AddServiceClient(factory, serviceProvider, LogLevel.Information, url);
        }

        /// <summary>
        /// Adds an entity framework logger that is enabled for <see cref="Microsoft.Extensions.Logging.LogLevel"/>s of minLevel
        /// or higher.
        /// </summary>
        /// <param name="factory">
        /// The extension method argument.
        /// </param>
        /// <param name="serviceProvider">
        /// The service provider for dependency injection.
        /// </param>
        /// <param name="minLevel">
        /// The minimum <see cref="Microsoft.Extensions.Logging.LogLevel"/> to be logged.
        /// </param>
        /// <param name="url">
        /// The url of the service
        /// </param>
        /// <typeparam name="TLogger">
        /// The type of the entity framework logger class used to log.
        /// </typeparam>
        public static ILoggerFactory AddServiceClient(
            this ILoggerFactory factory,
            IServiceProvider serviceProvider,
            LogLevel minLevel,
            string url = null)
        {
            return AddServiceClient(factory, serviceProvider, (_, logLevel) => logLevel >= minLevel, url);
        }

        /// <summary>
        /// Adds an entity framework logger that is enabled as defined by the filter function.
        /// </summary>
        /// <param name="factory">
        /// The extension method argument.
        /// </param>
        /// <param name="serviceProvider">
        /// The service provider for dependency injection.
        /// </param>
        /// <param name="filter">
        /// The function used to filter events based on the log level.
        /// </param>
        /// <param name="url">
        /// The url of the service.
        /// </param>
        public static ILoggerFactory AddServiceClient(
            this ILoggerFactory factory,
            IServiceProvider serviceProvider,
            Func<string, LogLevel, bool> filter,
            string url = null)
        {
            if (factory == null)
            {
                throw new ArgumentNullException(nameof(factory));
            }

            factory.AddProvider(new ServiceClientLoggerProvider<ServiceClientLogger>(serviceProvider, filter, url));
            return factory;
        }

        #endregion
    }
}