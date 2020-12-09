namespace EventManager.Logging.ServiceClient.Logger
{
    using EventManager.Logging.ServiceClient.Proxy;
    #region Usings

    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using System;
    using System.Diagnostics.CodeAnalysis;

    #endregion

    /// <summary>
    /// Represents a new instance of a service client logger for the specified log.
    /// </summary>
    [SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1402:FileMayOnlyContainASingleClass", Justification = "OK")]
    public class ServiceClientLogger : ILogger
    {
        #region Fields

        /// <summary>
        /// The function used to filter events based on the log level.
        /// </summary>
        private readonly Func<string, LogLevel, bool> filter;

        /// <summary>
        /// The service provider to resolve dependency.
        /// </summary>
        private readonly IServiceProvider serviceProvider;

        #endregion

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="ServiceClientLogger{TContext,TLog,TKey}"/> class.
        /// </summary>
        /// <param name="serviceProvider">
        /// The service provider to resolve dependency.
        /// </param>
        /// <param name="name">
        /// The name of the logger.
        /// </param>
        /// <param name="filter">
        /// The function used to filter events based on the log level.
        /// </param>
        /// <param name="url">
        /// The url of the service.
        /// </param>
        public ServiceClientLogger(
            IServiceProvider serviceProvider,
            string name,
            Func<string, LogLevel, bool> filter,
            string url = null)
        {
            this.serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
            this.filter = filter ?? throw new ArgumentNullException(nameof(filter));

            Name = name ?? string.Empty;
            Url = url;
        }

        #endregion

        #region Properties

        /// <summary>
        /// Gets the function used to create new model instance for a log.
        /// </summary>
        protected virtual string Url { get; }

        /// <summary>
        /// Gets the name of the logger.
        /// </summary>
        protected virtual string Name { get; }

        #endregion

        #region Implemented Interfaces

        #region ILogger

        /// <inheritdoc />
        public virtual IDisposable BeginScope<TState>(TState state)
        {
            return NoopDisposable.Instance;
        }

        /// <inheritdoc />
        public virtual bool IsEnabled(LogLevel logLevel)
        {
            // internal check to not log any Microsoft.ServiceClient. It won't work any way and cause StackOverflowException
            if (Name.StartsWith("System.Net.Http.HttpClient.Default", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            return (filter == null) || filter(Name, logLevel);
        }

        /// <inheritdoc />
        public virtual void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            if (!IsEnabled(logLevel))
            {
                return;
            }

            if (formatter == null)
            {
                throw new ArgumentNullException(nameof(formatter));
            }

            string message = formatter(state, exception);

            if (string.IsNullOrEmpty(message))
            {
                return;
            }

            message = $"{message}";

            if (exception != null)
            {
                message += $"{Environment.NewLine}{Environment.NewLine}{exception}";
            }

            WriteMessage(message, logLevel, eventId.Id);
        }

        #endregion

        #endregion

        #region Methods

        /// <summary>
        /// Writes message to database.
        /// </summary>
        /// <param name="message">
        /// The message to write.
        /// </param>
        /// <param name="logLevel">
        /// The log level to write.
        /// </param>
        /// <param name="eventId">
        /// The event id to write.
        /// </param>
        protected virtual void WriteMessage(string message, LogLevel logLevel, int eventId)
        {
            Console.WriteLine(message);
            using (IServiceScope scope = serviceProvider.CreateScope())
            {
                ServiceProxy client = ActivatorUtilities.CreateInstance<ServiceProxy>(scope.ServiceProvider);
                client.BaseUrl = Url;
                /*Task.Run(() =>
                {
                    client.Post(new ViewModel
                    {
                        TimeStamp = DateTimeOffset.Now,
                        Level = (int)logLevel,
                        EventId = eventId,
                        Name = Name.Length > 255 ? Name.Substring(0, 255) : Name,
                        Message = message

                    });
                });*/
            }
        }
        #endregion

        #region Nested Classes

        #region NoopDisposable

        /// <summary>
        /// The noop disposable.
        /// </summary>
        [SuppressMessage("StyleCop.CSharp.DocumentationRules", "SA1650:ElementDocumentationMustBeSpelledCorrectly", Justification = "OK")]
        private class NoopDisposable : IDisposable
        {
            #region Static Fields

            /// <summary>
            /// The instance.
            /// </summary>
            public static readonly NoopDisposable Instance = new NoopDisposable();

            #endregion

            #region Implemented Interfaces

            #region IDisposable

            /// <summary>
            /// The dispose.
            /// </summary>
            public void Dispose()
            {
            }

            #endregion

            #endregion
        }

        #endregion

        #endregion
    }
}