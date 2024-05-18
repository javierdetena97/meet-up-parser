// Models
import { MeetupLocation } from "./meetupLocation.model";

export interface Meetup {
    edition?: string;
    name: string;
    startDate: string;
    endDate?: string;
    location: MeetupLocation[];
}
