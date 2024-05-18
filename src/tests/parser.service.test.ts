// Data
import { meetups } from "../data/meetups";

// Services
import { parserService } from "../services/parser.service";

// Models
import { OutputData } from "../models/outputData.model";


describe("ParserService", () => {
    it("should parse meetups correctly", async () => {
        const parsedMeetups: OutputData = await parserService.toSingleLines(meetups);
        expect(parsedMeetups).toEqual({
            meetups: [
                "4th JBCN Conference · 2018-06-11 / 2018-06-13 · Barcelona, Spain",
                "3rd DevTernity · 2018-11-30 / 2018-12-01 · Riga, Latvia",
                "1st I T.A.K.E Unconference · 2016-05-19 / 2016-05-20 · Bucharest, Romania | Maramures, Romania",
                "2nd Product Owner Rule Book · 2016-04-11 / 2016-04-13 · Paris, France | Madrid, Spain",
                "Upfront Summit · 2018-02-01 · Los Angeles, California, United States",
                "IBM Think · 2018-03-19 · Nevada, United States"
            ]
        });
    });

    it("should handle meetups without end date", async () => {
        const singleDayMeetup = {
            input: [
                {
                    name: "Single Day Event",
                    startDate: "2022-01-01",
                    location: [
                        {
                            city: "Single City",
                            country: "Single Country"
                        }
                    ]
                }
            ]
        };
        const parsedMeetup: OutputData = await parserService.toSingleLines(singleDayMeetup);
        expect(parsedMeetup).toEqual({
            meetups: ["Single Day Event · 2022-01-01 · Single City, Single Country"]
        });
    });
});
