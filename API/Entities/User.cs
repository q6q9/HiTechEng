using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class User
    {
        [ScaffoldColumn(true)]
        public int Id { get; set; }
        [Required]
        public string ?Name { get; set; }
    }
}
