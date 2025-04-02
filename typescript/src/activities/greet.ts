import { Person } from '../person';

export async function greet_ts(person: Person) : Promise<string> {
    console.log(`[TS] Greet called with: ${person.title} ${person.firstName} ${person.lastName}`);

    return `Hello from Typescript, ${person.title} ${person.firstName} ${person.lastName}!`;
}

