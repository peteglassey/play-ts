import { proxyActivities, defineSignal, setHandler } from "@temporalio/workflow";
import * as activities from "../activities/example-activities";

type Person = {
    firstName: string;
    lastName: string;
    title?: string;
  };

const { greet } = proxyActivities<{
    greet(person: Person): Promise<string>;
}>({
    taskQueue: 'dotnet-activities',
    startToCloseTimeout: '1 minute',
});

export const setName = defineSignal<[string]>('setName');


export async function greetingWorkflow(initialName: string) : Promise<string> {
    let name = initialName;

    console.log(`Running greetingWorkflow. InitialName = ${initialName}`);

    //setHandler(setName, (newName: string) => {
    //    name = newName;
    //});

    //console.log(`Waiting for signal...`);
    //await new Promise((resolve) => setTimeout(resolve, 5000));

    return await greet({ firstName: 'Alan', lastName: 'Turing', title: 'Dr.' });
}