using System.ComponentModel.DataAnnotations;

public sealed class LoginRequest
{
    public LoginRequest(string groepscode, string teamnaam)
    {
        Groepscode = groepscode;
        Teamnaam = teamnaam;
    }

    [Required, StringLength(50, MinimumLength = 3)]
    public string Groepscode {get; init;} = string.Empty;

    [Required, StringLength(50, MinimumLength = 3)]
    public string Teamnaam {get; init;} = string.Empty;
}