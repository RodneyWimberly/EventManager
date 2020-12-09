using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Globalization;
using System.Net.Security;
using System.Resources;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace EventManager.Core.Email
{

    public class EmailService : IEmailService
    {
        private readonly SmtpConfig _smtpConfig;
        private readonly ILogger _logger;

        public EmailService(IOptions<SmtpConfig> smtpConfig, ILogger<EmailService> logger)
        {
            if (smtpConfig == null)
            {
                throw new ArgumentNullException(nameof(smtpConfig));
            }

            _smtpConfig = smtpConfig.Value;
            _logger = logger;
        }

        public async Task<(bool success, string errorMsg)> SendEmailAsync(
            string recepientName,
            string recepientEmail,
            string subject,
            string body,
            SmtpConfig config = null,
            bool isHtml = true)
        {
            MailboxAddress from = new MailboxAddress(_smtpConfig.Name, _smtpConfig.EmailAddress);
            MailboxAddress to = new MailboxAddress(recepientName, recepientEmail);

            return await SendEmailAsync(from, new MailboxAddress[] { to }, subject, body, config, isHtml).ConfigureAwait(false);
        }



        public async Task<(bool success, string errorMsg)> SendEmailAsync(
            string senderName,
            string senderEmail,
            string recepientName,
            string recepientEmail,
            string subject,
            string body,
            SmtpConfig config = null,
            bool isHtml = true)
        {
            MailboxAddress from = new MailboxAddress(senderName, senderEmail);
            MailboxAddress to = new MailboxAddress(recepientName, recepientEmail);

            return await SendEmailAsync(from, new MailboxAddress[] { to }, subject, body, config, isHtml).ConfigureAwait(false);
        }



        public async Task<(bool success, string errorMsg)> SendEmailAsync(
            MailboxAddress sender,
            MailboxAddress[] recepients,
            string subject,
            string body,
            SmtpConfig config = null,
            bool isHtml = true)
        {
            MimeMessage message = new MimeMessage();

            message.From.Add(sender);
            message.To.AddRange(recepients);
            message.Subject = subject;
            message.Body = isHtml ? new BodyBuilder { HtmlBody = body }.ToMessageBody() : new TextPart("plain") { Text = body };

            try
            {
                if (config == null)
                {
                    config = _smtpConfig;
                }

                using (SmtpClient client = new SmtpClient())
                {
                    if (!config.UseSSL)
                    {
                        client.ServerCertificateValidationCallback = (object sender2, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) =>
                        {
                            bool retVal = true;
                            return retVal;
                        };
                    }

                    await client.ConnectAsync(config.Host, config.Port, config.UseSSL).ConfigureAwait(false);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");

                    if (!string.IsNullOrWhiteSpace(config.Username))
                    {
                        await client.AuthenticateAsync(config.Username, config.Password).ConfigureAwait(false);
                    }

                    await client.SendAsync(message).ConfigureAwait(false);
                    await client.DisconnectAsync(true).ConfigureAwait(false);
                }

                return (true, null);
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.SendEmail, ex, new ResourceManager("Resource", GetType().Assembly).GetString("ERROR_SENDING_EMAIL", CultureInfo.CurrentCulture));
                return (false, ex.Message);
                throw;
            }
        }
    }
}
