// Data
import { meetups } from "./data/meetups";

// Services
import { parserService } from "./services/parser.service";


async function main(): Promise<void> {
    const parsedMeetups = await parserService.toHtml(meetups);
    console.log(JSON.stringify(parsedMeetups, null, 2));
}

main().catch(err => console.error(err));
