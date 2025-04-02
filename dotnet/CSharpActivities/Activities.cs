using System.Text.Json.Serialization;
using Temporalio.Activities;

namespace CSharpActivities;

public class Activities
{
        [Activity(name: "greet_cs")] // the temporal activity name differs from this method's name
        public string Greet(Person person)
        {
            var fullName = $"{person.Title} {person.FirstName} {person.LastName}".Trim();
            Console.WriteLine($"[C#] Greet called with: {fullName}");
            return $"Hello from C#, {fullName}!";
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