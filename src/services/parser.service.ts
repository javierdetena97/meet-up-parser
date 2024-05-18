// Models
import { Meetup } from "../models/meetup.model";
import { InputData } from "../models/inputData.model";
import { OutputData } from "../models/outputData.model";

class ParserService {

    public async toSingleLines(inputData: InputData): Promise<OutputData> {
        const meetUps: Meetup[] = inputData.input;
        const parsedMeetUps: string[] = [];

        meetUps.forEach(meetUp => {
            const edition: string = meetUp.edition ? meetUp.edition + " " : "";
            const name: string = meetUp.name;
            const startDate: string = meetUp.startDate;
            const endDate: string = meetUp.endDate ? " / " + meetUp.endDate : "";
            const locations: string = meetUp.location.map(location => {
                return [location.city, location.state, location.country].filter(Boolean).join(", ");
            }).join(" | ");

            const parsedMeetup: string = `${edition}${name} · ${startDate}${endDate} · ${locations}`;
            parsedMeetUps.push(parsedMeetup);
        });

        return {meetUps: parsedMeetUps};
    }

}

export const parserService: ParserService = new ParserService();
