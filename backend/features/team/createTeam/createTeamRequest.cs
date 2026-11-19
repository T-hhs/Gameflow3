using System.ComponentModel.DataAnnotations;

public sealed class CreateTeamRequest
{
    [Required, StringLength(50, MinimumLength = 3)]
    public string Groepscode {get; init;} = string.Empty;

    [StringLength(50, MinimumLength = 3)]
    public string Teamnaam {get; init;} = string.Empty;

    public int game {get; init;}
}