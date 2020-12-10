using Arch.EntityFrameworkCore.UnitOfWork;
using EventManager.Events.DataAccess.Models;
using EventManager.Events.Service.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EventManager.Events.Service.Controllers
{
    namespace v1_0
    {
        [ApiVersion("1.0")]
        [ApiExplorerSettings(IgnoreApi = false, GroupName = "Logger v1.0")]
        [Route("api/[controller]")]
        [Route("api/v{version:apiVersion}/[controller]")]
        [ApiController]
        public class LoggerController : ControllerBase
        {
            private readonly IUnitOfWork _unitOfWork;
            private readonly IRepository<ExtendedLog> _repository;

            public LoggerController(IUnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
                _repository = _unitOfWork.GetRepository<ExtendedLog>();
            }

            [HttpPost]
            [AllowAnonymous]
            [ProducesResponseType(204)]
            public async Task<IActionResult> Post([FromBody] ExtendedLogViewModel extendedLogVM)
            {
                await _repository.InsertAsync(new ExtendedLog
                {
                    Message = extendedLogVM.Message,
                    TimeStamp = extendedLogVM.TimeStamp,
                    Level = extendedLogVM.Level,
                    EventId = extendedLogVM.EventId,
                    Name = extendedLogVM.Name
                });
                await _unitOfWork.SaveChangesAsync();
                return NoContent();
            }
        }
    }
}
