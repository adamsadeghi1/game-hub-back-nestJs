import { ScreenShot } from "./screenShots.dto";

export class ScreenShotsApiResponse{
    count: number;
    next: string;
    results: ScreenShot[];
}