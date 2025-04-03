# play-ts
A temporal spike to learn more about running a workflow defined TypeScript to run activities in both Typescript and C# 

This project demonstrates how to build a **polyglot Temporal application** using:

- **TypeScript** for workflows and some activities
- **C# (.NET 9)** for additional activities
- **Temporal Server** running via Docker


## 📐 Architecture
```txt

 +-------------+         +------------------------+
 |  Client     |-------->|    Temporal Server     |
 +-------------+         |       (Docker)         |
                         +-----------+------------+
                                     |
                    Activity Task    |   Workflow Task
                    Queue:           |   Queue:
                      "dotnet-queue" |     "typescript-queue"
                                     |
             +----------------+      |     +-------------------------+
             |   C# Worker    |      |     |   TypeScript Worker     |
             | (Activities)   |<-----------| (Workflows)             |
             |  - greet_cs()  |            |  - polyglotGreeting()   |
             |                |            |                         |
             +----------------+            | (Activities)            |
                                           |  - greet_ts()           |
                                           +-------------------------+
```

### Client
Simple console app which:
1. Connects to temporal
2. Requests to start the `polyglotGreeting` workflow. 
3. Prints the result

### Typescript Worker
Simple console app which:
1. Connects to temporal
2. Registers the `polyglotGreeting` workflow on the `typescript-queue` 
3. Registers the `greet_ts` activity on the `typescript-queue` 
4. Waits for work to appear on its queue.

#### polyglotGreeting Workflow
Defines the `polyglotGreeting` workflow. 
This workflows does:
1. First, run the `greet_ts` activity
2. Then, run the `greet_cs` activity
3. Print to console the result of both calls (string)

#### greet_ts Activity
Provides the implementation of the greet_ts activity in typescript. Simply returns "Hello X Y Z"

### Dotnet Worker
Simple console app which:
1. Connects to temporal
2. Registers the `greet_cs` activity on the `dotnet-queue` 
4. Waits for work to appear on its queue.

#### greet_cs Activity
Provides the implementation of the `greet_cs` activity in C#. Simply returns "Hello X Y Z"

---

## 🧪 Features

- Call a **C# activity** (`greet`) from a **TypeScript workflow**
- Chain it to a **TypeScript activity** (`logResult`)
- Run the workflow via CLI or REST API
- Demonstrates cross-language task queue coordination

---

## 🚀 Quick Start

### 1. Install NodeJs and NPM
https://nodejs.org/en/download


### 2. Clone the repo & install dependencies

```
npm install

```

### 3. Start Docker Compose
This starts the:
 - temporal server 
 - postgres database
 - temporal ui (browse http://localhost:8080)

```
cd ./docker-compose
docker-compose up -d --abort-on-container-exit 
```


### 4. Start the C# dotnet Activity Worker
This starts the dotnet console application which acts as a temporal worker and subscribes to the `dotnet-queue` queue and registers to handle the `greet_cs` activity.
in a new console:
```
cd .\dotnet\CSharpActivities\
dotnet run
```


### 5. Start the Typescript Activity & Workflow Worker
This starts the nodejs console application which acts as a temporal worker and subscribes to the `typescript-queue` queue and registers the `polyglotGreeting` workflow and registers to handle the `greet_ts` activity.
in a new console:
```
 npx ts-node ./typescript/src/workers/worker.ts  
```

### 6. Start the Typescript Client
This is the client that wants to run the `polyglotGreeting` workflow.
in a new console:
```
npx ts-node ./typescript/src/client.ts 
```

### 7. Check It worked
Check the client logs the result of the workflow to the console. It should look like:
`Workflow result: "Hello from Typescript, Countess Ada Lovelace!", "Hello from C#, Countess Ada Lovelace!"`

You can check the dotnet console and the typescript worker console as well.

