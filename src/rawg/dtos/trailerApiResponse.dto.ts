import { Trailer } from "./trailer.dto";

export interface TrailerApiResponse {
    next: string;
    results: Trailer[];
  }