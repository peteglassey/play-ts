using Temporalio.Client;
using Temporalio.Worker;

namespace CSharpActivities;

public static class DotNetAcitivityWorker
{
    public static TemporalWorker Worker
    {
        get
        {
            var client = TemporalClient.ConnectAsync(
                new TemporalClientConnectOptions("localhost:7233"){ Namespace = "default" })
                .GetAwaiter().GetResult();
            
            var activities = new Activities();
            return new(
                client,
                new TemporalWorkerOptions("dotnet-queue")
                    .AddActivity(activities.Greet));
        }
    }
} 


