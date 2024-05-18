// Models
import { MeetUpLocation } from "./meetUpLocation.model";

export interface MeetUp {
    edition?: string;
    name?: string;
    startDate?: string;
    endDate?: string;
    location?: MeetUpLocation[];
}
