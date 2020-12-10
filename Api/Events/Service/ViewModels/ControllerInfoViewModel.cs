using System.Collections.Generic;

namespace EventManager.Events.Service.ViewModels
{
    public class ControllerInfoViewModel
    {
        public ControllerInfoViewModel()
        {
            Actions = new List<string>();
        }

        public string Name { get; set; }

        public IEnumerable<string> Actions { get; set; }
    }
}
