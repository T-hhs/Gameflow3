namespace backend.dtos;
public class RegisterDto
{
    public string Gebruikersnaam { get; set; } = string.Empty;
    public string Wachtwoord { get; set; } = string.Empty;
    public string Rol { get; set; } = string.Empty;
}