import { Worker } from '@temporalio/worker';
import * as activities from '../activities/example-activities';

async function run(){
    const worker = await Worker.create({
        workflowsPath: require.resolve('../workflows/example-workflow'),
        activities,
        taskQueue: 'greeting-queue'
    });

    console.log('Starting Worker...');
    await worker.run();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});