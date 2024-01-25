export interface Anomaly{
    id: number;
    timestamp: Date;
    longitude: number;
    latitude: number;
    photo: string;
    isFixed : boolean;
    isFalse: boolean;
    trainId: number;
    trainTrackId: number;
    countryId: number;
    anomalyTypeId: number;
    signId: number;
    count: number;
}