// Data
import { meetUps } from "../data/meetUps";

// Services
import { parserService } from "../services/parser.service";

// Models
import { OutputData } from "../models/outputData.model";


describe("ParserService", () => {
    it("should parse meetups correctly", async () => {
        const parsedMeetups: OutputData = await parserService.toSingleLines(meetUps);
        expect(parsedMeetups).toEqual({
            meetUps: [
                "4th JBCN Conference · 2018-06-11 / 2018-06-13 · Barcelona, Spain",
                "3rd DevTernity · 2018-11-30 / 2018-12-01 · Riga, Latvia",
                "1st I T.A.K.E Unconference · 2016-05-19 / 2016-05-20 · Bucharest, Romania | Maramures, Romania",
                "2nd Product Owner Rule Book · 2016-04-11 / 2016-04-13 · Paris, France | Madrid, Spain",
                "Upfront Summit · 2018-02-01 · Los Angeles, California, United States",
                "IBM Think · 2018-03-19 · Nevada, United States"
            ]
        });
    });

    it("should handle meetups without edition", async () => {
        const singleDayMeetup = {
            input: [
                {
                    name: "Mobile World Congress",
                    startDate: "2024-02-26",
                    endDate: "2024-02-29",
                    location: [
                        {
                            city: "Barcelona",
                            country: "Spain"
                        }
                    ]
                }
            ]
        };
        const parsedMeetup: OutputData = await parserService.toSingleLines(singleDayMeetup);
        expect(parsedMeetup).toEqual({
            meetUps: ["Mobile World Congress · 2024-02-26 / 2024-02-29 · Barcelona, Spain"]
        });
    });

    it("should handle meetups without name", async () => {
        const singleDayMeetup = {
            input: [
                {
                    edition: "18th",
                    startDate: "2024-02-26",
                    endDate: "2024-02-29",
                    location: [
                        {
                            city: "Barcelona",
                            country: "Spain"
                        }
                    ]
                }
            ]
        };
        const parsedMeetup: OutputData = await parserService.toSingleLines(singleDayMeetup);
        expect(parsedMeetup).toEqual({
            meetUps: ["18th  · 2024-02-26 / 2024-02-29 · Barcelona, Spain"]
        });
    });

    it("should handle meetups without start date", async () => {
        const singleDayMeetup = {
            input: [
                {
                    edition: "18th",
                    name: "Mobile World Congress",
                    endDate: "2024-02-29",
                    location: [
                        {
                            city: "Barcelona",
                            country: "Spain"
                        }
                    ]
                }
            ]
        };
        const parsedMeetup: OutputData = await parserService.toSingleLines(singleDayMeetup);
        expect(parsedMeetup).toEqual({
            meetUps: ["18th Mobile World Congress ·  / 2024-02-29 · Barcelona, Spain"]
        });
    });

    it("should handle meetups without end date", async () => {
        const singleDayMeetup = {
            input: [
                {
                    edition: "18th",
                    name: "Mobile World Congress",
                    startDate: "2024-02-26",
                    location: [
                        {
                            city: "Barcelona",
                            country: "Spain"
                        }
                    ]
                }
            ]
        };
        const parsedMeetup: OutputData = await parserService.toSingleLines(singleDayMeetup);
        expect(parsedMeetup).toEqual({
            meetUps: ["18th Mobile World Congress · 2024-02-26 · Barcelona, Spain"]
        });
    });

    it("should handle meetups without location", async () => {
        const singleDayMeetup = {
            input: [
                {
                    edition: "18th",
                    name: "Mobile World Congress",
                    startDate: "2024-02-26",
                    endDate: "2024-02-29"
                }
            ]
        };
        const parsedMeetup: OutputData = await parserService.toSingleLines(singleDayMeetup);
        expect(parsedMeetup).toEqual({
            meetUps: ["18th Mobile World Congress · 2024-02-26 / 2024-02-29 · No location available"]
        });
    });
});
