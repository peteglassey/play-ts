# play-ts
A temporal spike to learn more about running a workflow defined TypeScript to run activities in both Typescript and C# 
```

 +-------------+         +------------------------+
 |  Client     |-------->|    Temporal Server     |
 +-------------+         |       (Docker)         |
                         +-----------+------------+
                                     |
                    Activity Task    |   Workflow Task
                    Queue:           |   Queue:
                    "dotnet-queue"         "typescript-queue"
                                     |
             +----------------+      |     +-------------------------+
             |   C# Worker    |      |     |   TypeScript Worker     |
             | (Activities)   |<-----------| (Workflows)             |
             |  - greet()     |            |  - polyglotGreeting()   |
             |                |            |                         |
             +----------------+            | (Activities)            |
                                           |  - greetts()            |
                                           +-------------------------+
```
