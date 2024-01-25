import { Coordinate } from "./coordinate";

export interface Traintrack{
    id: number;
    name: string;
    trackGeometry: Coordinate[];
}