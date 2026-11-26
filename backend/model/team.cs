

public sealed class Team
{
    public int Id  {get; set;}

    public required string Groepscode  {get; set;}

    public string Teamnaam  {get; set;} = "default";

    public string Hint  {get; set;} = string.Empty;

    public int game {get; set;}

    public int supermarkt  {get; set;}
}