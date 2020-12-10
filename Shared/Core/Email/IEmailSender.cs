using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventManager.Shared.Core.Email
{ 
    public interface IEmailSender
    {
        Task SendEmail(string email, string subject, string message, string toUsername);
    }
}
