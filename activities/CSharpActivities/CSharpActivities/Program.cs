using CSharpActivities;
using Temporalio.Client;
using Temporalio.Worker;

Console.WriteLine("Running C# Activity worker. Subscribing to queue 'dotnet-activities'.");

var client = await TemporalClient.ConnectAsync(new TemporalClientConnectOptions("localhost:7233"){ Namespace = "default" });

var activities = new Activities();

var worker = new TemporalWorker(
    client,
    new TemporalWorkerOptions("dotnet-activities")
        .AddActivity(activities.Greet)
);

await worker.ExecuteAsync(CancellationToken.None);