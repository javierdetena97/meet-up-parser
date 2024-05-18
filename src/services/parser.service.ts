// Models
import { MeetUp } from "../models/meetUp.model";
import { InputData } from "../models/inputData.model";
import { OutputData } from "../models/outputData.model";

class ParserService {

    public async toSingleLines(inputData: InputData): Promise<OutputData> {
        const meetUps: MeetUp[] = inputData.input;
        const parsedMeetUps: string[] = [];

        meetUps.forEach(meetUp => {
            const edition: string = meetUp.edition ? meetUp.edition + " " : "";
            const name: string = meetUp.name ? meetUp.name : "";
            const startDate: string = meetUp.startDate ? meetUp.startDate : "";
            const endDate: string = meetUp.endDate ? " / " + meetUp.endDate : "";
            const locations: string = (meetUp.location && meetUp.location.length > 0) ? meetUp.location.map(location => {
                return [location.city, location.state, location.country].filter(Boolean).join(", ");
            }).join(" | ") : "No location available";

            const parsedMeetup: string = `${edition}${name} · ${startDate}${endDate} · ${locations}`;
            parsedMeetUps.push(parsedMeetup);
        });

        return {meetUps: parsedMeetUps};
    }

}

export const parserService: ParserService = new ParserService();
