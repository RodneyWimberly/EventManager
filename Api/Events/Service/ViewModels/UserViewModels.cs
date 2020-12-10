namespace EventManager.Events.Service.ViewModels
{
    public class UserViewModel : UserBaseViewModel
    {
        public bool IsLockedOut { get; set; }

        public string[] Roles { get; set; }
    }
}
