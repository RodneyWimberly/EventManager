namespace EventManager.Logging.ServiceClient.Logger
{
    #region Usings

    using Microsoft.Extensions.Logging;
    using System;

    #endregion

    /// <summary>
    /// The entity framework logger provider base.
    /// </summary>
    public abstract class ServiceClientLoggerProviderBase : ILoggerProvider
    {
        #region Static Fields

        /// <summary>
        /// The true filter.
        /// </summary>
        protected static readonly Func<string, LogLevel, bool> TrueFilter = (cat, level) => true;

        #endregion

        #region Fields

        /// <summary>
        /// The disposed flag.
        /// </summary>
        private bool disposed;

        #endregion

        #region Implemented Interfaces

        #region IDisposable

        /// <inheritdoc/>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion

        #region ILoggerProvider

        /// <inheritdoc/>
        public abstract ILogger CreateLogger(string categoryName);

        #endregion

        #endregion

        #region Methods

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">
        /// True if managed resources should be disposed; otherwise, false.
        /// </param>
        protected virtual void Dispose(bool disposing)
        {
            disposed = true;
        }

        /// <summary>
        /// Throws if this class has been disposed.
        /// </summary>
        protected void ThrowIfDisposed()
        {
            if (disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
        }

        #endregion
    }
}