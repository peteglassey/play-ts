import { ApplicationFailure } from "@temporalio/client";

export async function greet(name: string) : Promise<string> {
    console.log(`Running activity: greet(${name})`);

    if(name === "fail"){
        throw ApplicationFailure.nonRetryable('Bugger!');
    }
    
    return `Hello, ${name}!`;
}
