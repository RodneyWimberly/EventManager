namespace EventManager.Logging.ServiceClient.Logger
{
    #region Usings

    using System.Diagnostics.CodeAnalysis;

    #endregion

    /// <summary>
    /// The entity framework logger options.
    /// </summary>
    public class ServiceClientLoggerOptions
    {
        #region Public Properties

        /// <summary>
        /// Get or sets the Uri used to reach to service
        /// </summary>
        public string Url { get; set; }

        #endregion
    }
}