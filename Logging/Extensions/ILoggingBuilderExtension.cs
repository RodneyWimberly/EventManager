namespace EventManager.Logging.ServiceClient.Extensions
{
    using EventManager.Logging.ServiceClient.Logger;
    #region Usings

    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.DependencyInjection.Extensions;
    using Microsoft.Extensions.Logging;
    using System;

    #endregion

    /// <summary>
    /// The entity framework logger builder extensions.
    /// </summary>
    public static class ILoggingBuilderExtension
    {
        #region Public Methods
        /// <summary>
        /// Adds a entity framework logger named 'ServiceClient' to the factory.
        /// </summary>
        /// <param name="builder">
        /// The <see cref="Microsoft.Extensions.Logging.ILoggingBuilder"/> to use.
        /// </param>
        public static Microsoft.Extensions.Logging.ILoggingBuilder AddServiceClient(this Microsoft.Extensions.Logging.ILoggingBuilder builder)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            builder.Services.TryAddEnumerable(ServiceDescriptor.Singleton<ILoggerProvider, ServiceClientLoggerProvider<ServiceClientLogger>>());

            return builder;
        }

        /// <summary>
        /// Adds a entity framework logger named 'ServiceClient' to the factory.
        /// </summary>
        /// <param name="builder">
        /// The <see cref="Microsoft.Extensions.Logging.ILoggingBuilder"/> to use.
        /// </param>
        /// <param name="configure">
        /// The <see cref="Microsoft.Extensions.Logging.ILoggingBuilder"/> configuration delegate.
        /// </param>
        public static Microsoft.Extensions.Logging.ILoggingBuilder AddServiceClient(
            this Microsoft.Extensions.Logging.ILoggingBuilder builder,
            Action<ServiceClientLoggerOptions> configure)
        {
            if (configure == null)
            {
                throw new ArgumentNullException(nameof(configure));
            }

            builder.AddServiceClient();
            builder.Services.Configure(configure);

            return builder;
        }

        #endregion
    }
}