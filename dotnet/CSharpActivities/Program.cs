using CSharpActivities;
using Temporalio.Client;

Console.WriteLine("Running C# Activity worker. Subscribing to queue 'dotnet-queue'.");

await ActivityWorker.Worker.ExecuteAsync(CancellationToken.None);