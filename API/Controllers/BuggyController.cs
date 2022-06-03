using API.Data;
using API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;

        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("404")]
        public async Task<ActionResult> Get404()
        {
            return NotFound();
        }

        [Authorize]
        [HttpGet("401")]
        public async Task<ActionResult<string>> Get401()
        {
            return "response";
        }


        [HttpGet("400")]
        public async Task<ActionResult> Get400()
        {
            return BadRequest("just bad request");
        }


        [HttpGet("500")]
        public async Task<ActionResult<string>> Get500()
        {
            return _context.Users.Find(-1).ToString();
        }


    }
}
