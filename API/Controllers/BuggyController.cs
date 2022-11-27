using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _dataContext;
        public BuggyController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [Authorize]
        [HttpGet("Auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("Not-Found")]
        public ActionResult<AppUser> GetNotFound()
        {
            AppUser thing = _dataContext.Users.Find(-1);

            if (thing == null)
                return NotFound();

            return Ok(thing);
        }

        [HttpGet("Server-Error")]
        public ActionResult<string> GetServerError()
        {
            AppUser thing = _dataContext.Users.Find(-1);
            return thing.ToString();
        }

        [HttpGet("Bad-Request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("Bad Request");
        }

    }
}