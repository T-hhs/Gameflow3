# Gameflow3
HHS SE3 project groep Gameflow 3

Using microsoft sql server management studio

Install steps:

make sure you are in directory ../PROJECTNAME/backend

dotnet add package Microsoft.EntityFrameworkCore.Design

dotnet add package Microsoft.EntityFrameworkCore.SqlServer

dotnet add package Swashbuckle.AspNetCore

dotnet user-secrets init

in appsettings.json, add the following:

"ConnectionStrings": {
    "gameflow3": "Server=localhost\\SQLEXPRESS;Database=gameflow3;Trusted_Connection=True;TrustServerCertificate=True;"
  }


dotnet ef migrations add InitialCreate

dotnet ef database update
