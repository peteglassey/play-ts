import { proxyActivities } from '@temporalio/workflow';
import { Person } from '../person';

const { greet_cs } = proxyActivities<{
    greet_cs(person: Person): Promise<string>;
}>({
  taskQueue: 'dotnet-queue',
  startToCloseTimeout: '1 minute',
});

const { greet_ts } = proxyActivities<{
    greet_ts(person: Person): Promise<void>;
  }>({
    taskQueue: 'typescript-queue',
    startToCloseTimeout: '10 seconds',
  });

export async function polyglotGreeting(person: Person): Promise<string> {

    // Run the Typescript greet() activity
    const tsResult = await greet_ts(person);

    // Run the C# greet() activity
    const csResult = await greet_cs(person);

    return `"${tsResult}", "${csResult}"`;
}