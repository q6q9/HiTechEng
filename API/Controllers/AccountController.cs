using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Name)) return BadRequest("This name is already exists");

            using var hmac = new HMACSHA512();

            var user = new User
            {
                Name = registerDto.Name.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Name = user.Name,
                Token = _tokenService.CreateToken(user),
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            User? user = await _context.Users.SingleOrDefaultAsync(user => user.Name.Equals(loginDto.Name.ToLower()));

            if (user is null) return Unauthorized("Incorrect username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (!computedHash[i].Equals(user.PasswordHash[i])) return Unauthorized("Incorrect password");
            }

            return new UserDto
            {
                Name = user.Name,
                Token = _tokenService.CreateToken(user),
            };
        }

        private async Task<bool> UserExists(string name)
        {
            return await _context.Users.AnyAsync(user => user.Name.Equals(name.ToLower()));
        }
    }
}
