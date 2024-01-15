export interface Anomaly{
    id: number;
    timestamp: Date;
    longitude: string;
    latitude: string;
    photo: string;
    isFixed : boolean;
    isFalse: boolean;
    trainId: number;
    trainTrackId: number;
    countryId: number;
    anomalyTypeId: number;
    signId: number;
}