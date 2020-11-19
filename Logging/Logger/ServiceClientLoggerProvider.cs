namespace EventManager.Logging.ServiceClient.Logger
{
    #region Usings

    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using System;
    using System.Diagnostics.CodeAnalysis;

    #endregion Usings

    /// <summary>
    /// Represents a new instance of an entity framework logger provider for the specified log.
    /// </summary>
    [ProviderAlias("ServiceClient")]
    public class ServiceClientLoggerProvider<TLogger> : ServiceClientLoggerProviderBase
        where TLogger : ServiceClientLogger
    {
        #region Fields

        /// <summary>
        /// The function used to create new model instance for a log.
        /// </summary>
        private readonly string url;

        /// <summary>
        /// The object factory to create new logger used defined types.
        /// </summary>
        private readonly ObjectFactory factory;

        /// <summary>
        /// The function used to filter events based on the log level.
        /// </summary>
        private readonly Func<string, LogLevel, bool> filter;

        /// <summary>
        /// The service provider to resolve dependency.
        /// </summary>
        private readonly IServiceProvider serviceProvider;

        #endregion Fields

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="ServiceClientLoggerProvider{TContext,TLog,TLogger,TKey}"/> class.
        /// </summary>
        /// <param name="serviceProvider">
        /// The service provider to resolve dependency.
        /// </param>
        /// <param name="filter">
        /// The filter used to filter log messages.
        /// </param>
        /// <param name="creator">
        /// The creator used to create new instance of log.
        /// </param>
        public ServiceClientLoggerProvider(IServiceProvider serviceProvider, Func<string, LogLevel, bool> filter, string url = null)
        {
            this.serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
            this.filter = filter ?? throw new ArgumentNullException(nameof(filter));
            this.url = url;
            factory = ActivatorUtilities.CreateFactory(
                typeof(TLogger),
                new[] { typeof(string), typeof(Func<string, LogLevel, bool>), typeof(string) });
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ServiceClientLoggerProvider{TContext,TLog,TLogger,TKey}"/> class.
        /// </summary>
        /// <param name="serviceProvider">
        /// The service provider.
        /// </param>
        /// <param name="options">
        /// The options.
        /// </param>
        public ServiceClientLoggerProvider(IServiceProvider serviceProvider, IOptions<ServiceClientLoggerOptions> options)
        {
            if (options == null)
            {
                throw new ArgumentNullException(nameof(options));
            }

            this.serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));

            // Filter would be applied on LoggerFactory level
            filter = TrueFilter;
            url = options.Value.Url;
            factory = ActivatorUtilities.CreateFactory(
                typeof(TLogger),
                new[] { typeof(string), typeof(Func<string, LogLevel, bool>), typeof(string) });
        }

        #endregion Constructors and Destructors

        #region Public Methods

        /// <inheritdoc/>
        public override ILogger CreateLogger(string categoryName)
        {
            ThrowIfDisposed();
            return (ILogger)factory(serviceProvider, new object[] { categoryName, filter, url });
        }

        #endregion Public Methods
    }
}