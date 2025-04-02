import { Connection, Client } from '@temporalio/client';
import { v4 as uuid } from 'uuid';
import { greetingWorkflow, setName } from './workflows/greeting-workflow';

const initialName = process.argv[2] ?? 'World';

async function run() {
    const connection = await Connection.connect();
    const client = new Client({connection});
    const workflowId = 'greeting-' + uuid();
    const handle = await client.workflow.start(greetingWorkflow, {
        args: [initialName],
        taskQueue: 'example-workflow',
        workflowId: workflowId
    });
    
    console.log(`Started workflow ${handle.workflowId} with initial name: ${initialName}`);

    // Step 4: Wait 2 seconds and send a signal
    /*
    await new Promise((r) => setTimeout(r, 2000));

    const newName = 'Signalton';
    console.log(`Sending signal to update name to: ${newName}`);
    await handle.signal(setName, newName);
    */


    const result = await handle.result();

    console.log(`Result = ${result}`);
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
  });