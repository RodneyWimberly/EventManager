/*using FluentValidation;


namespace EventManager.Web.ViewModels.Validators
{
    public class EventViewModelValidator : AbstractValidator<EventViewModel>
    {
        public EventViewModelValidator()
        {
            RuleFor(e => e.Name)
                .NotEmpty()
                .MaximumLength(100)
                .WithMessage("Name must be between 1 and 100 characters.");
            RuleFor(e => e.Description)
                .MaximumLength(200)
                .WithMessage("Description must be less than 200 characters.");
        }
    }
}
*/