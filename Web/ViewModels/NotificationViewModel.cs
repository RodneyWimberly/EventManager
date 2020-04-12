using System;

namespace EventManager.Web.ViewModels
{
    public class NotificationViewModel : ApplicationViewModelBase
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Body { get; set; }
        public bool IsRead { get; set; }
        public bool IsPinned { get; set; }
        public DateTime Date { get; set; }
    }
}
