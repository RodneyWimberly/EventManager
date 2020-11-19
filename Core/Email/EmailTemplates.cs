using System;
using System.Globalization;

namespace EventManager.Core.Email
{
    public static class EmailTemplates
    {
        private static string testEmailTemplate;
        private static string plainTextTestEmailTemplate;

        public static string GetTestEmail(string recepientName, DateTime testDate)
        {
            if (testEmailTemplate == null)
            {
                testEmailTemplate = StoragePath.ReadPhysicalFile("Email/Templates/TestEmail.template");
            }

            string emailMessage = testEmailTemplate
                .Replace("{user}", recepientName, StringComparison.InvariantCulture)
                .Replace("{testDate}", testDate.ToString(CultureInfo.CurrentCulture), StringComparison.InvariantCulture);

            return emailMessage;
        }

        public static string GetPlainTextTestEmail(DateTime date)
        {
            if (plainTextTestEmailTemplate == null)
            {
                plainTextTestEmailTemplate = StoragePath.ReadPhysicalFile("Email/Templates/PlainTextTestEmail.template");
            }

            string emailMessage = plainTextTestEmailTemplate
                .Replace("{date}", date.ToString(CultureInfo.CurrentCulture), StringComparison.InvariantCulture);

            return emailMessage;
        }
    }
}
