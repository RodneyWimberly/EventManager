using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventManager.Web.ViewModels
{
    public class ApiInfoViewModel
    {
        public IEnumerable<KeyValuePair<string, string>> Configuration { get; set; }
        public IEnumerable<ControllerInfoViewModel> Controllers { get; set; }
    }
}
