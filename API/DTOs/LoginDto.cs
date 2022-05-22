﻿using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class LoginDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password{ get; set; }
    }
}
