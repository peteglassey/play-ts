import { Connection, Client } from '@temporalio/client';
import { v4 as uuid } from 'uuid';
import { polyglotGreeting } from './workflows/workflow';
import { Person } from './person';

const person: Person = {
  firstName: process.argv[2] ?? 'Ada',
  lastName: process.argv[3] ?? 'Lovelace',
  title: process.argv[4] ?? 'Countess',
};

async function run() {
  const connection = await Connection.connect();
  const client = new Client({ connection });

  const handle = await client.workflow.start(polyglotGreeting, {
    args: [person],
    taskQueue: 'typescript-queue',
    workflowId: 'polyglot-' + uuid(),
  });

  console.log(`Started polyglot workflow: ${handle.workflowId}`);
  const result = await handle.result();
  console.log(`Workflow result: ${result}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});