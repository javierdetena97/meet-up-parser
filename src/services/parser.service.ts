// Models
import { Meetup } from "../models/meetup.model";
import { InputData } from "../models/inputData.model";
import { OutputData } from "../models/outputData.model";

class ParserService {

    public async toSingleLines(inputData: InputData): Promise<OutputData> {
        const meetups: Meetup[] = inputData.input;
        const parsedMeetups: string[] = [];

        meetups.forEach(meetup => {
            const edition: string = meetup.edition ? meetup.edition + " " : "";
            const name: string = meetup.name;
            const startDate: string = meetup.startDate;
            const endDate: string = meetup.endDate ? " / " + meetup.endDate : "";
            const locations: string = meetup.location.map(location => {
                return [location.city, location.state, location.country].filter(Boolean).join(", ");
            }).join(" | ");

            const parsedMeetup: string = `${edition}${name} · ${startDate}${endDate} · ${locations}`;
            parsedMeetups.push(parsedMeetup);
        });

        return {meetups: parsedMeetups};
    }

}

export const parserService: ParserService = new ParserService();
