// Data
import { meetUps } from "./data/meetUps";

// Services
import { parserService } from "./services/parser.service";


async function main(): Promise<void> {
    const parsedMeetUps = await parserService.toSingleLines(meetUps);
    console.log(JSON.stringify(parsedMeetUps, null, 2));
}

main().catch(err => console.error(err));
