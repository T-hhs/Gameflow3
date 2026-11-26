using System.ComponentModel.DataAnnotations;

public sealed class CreateSmRequest
{
    [StringLength(50, MinimumLength = 3)]
    public string Naam {get; init;} = string.Empty;

    public int team {get; init;}
}