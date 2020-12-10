namespace EventManager.Events.Service.ViewModels
{
    public class UserEditViewModel : UserBaseViewModel
    {
        public string CurrentPassword { get; set; }

        public string NewPassword { get; set; }

        public bool IsLockedOut { get; set; }

        public string[] Roles { get; set; }
    }
}
