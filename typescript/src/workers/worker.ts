import { Worker } from '@temporalio/worker';
import * as activities  from '../activities/greet'

async function runWorker() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflows/workflow'),
    activities: activities,
    taskQueue: 'typescript-queue',
  });

  console.log('👷 TS Worker running on task queue: typescript-queue');
  await worker.run();
}

runWorker().catch((err) => {
  console.error(err);
  process.exit(1);
});