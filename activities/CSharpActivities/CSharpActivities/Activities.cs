using System.Text.Json.Serialization;
using Temporalio.Activities;

namespace CSharpActivities;

public class Activities
{
    [Activity]
    public string Greet(Person person)
    {
        var fullName = $"{person.Title} {person.FirstName} {person.LastName}".Trim();
        return $"Hello from .NET, {fullName}!";
    }
}

public class Person
{
    [JsonPropertyName("firstName")] 
    public string FirstName { get; set; } = "";

    [JsonPropertyName("lastName")]
    public string LastName { get; set; } = "";

    [JsonPropertyName("title")]
    public string? Title { get; set; } = "";
}