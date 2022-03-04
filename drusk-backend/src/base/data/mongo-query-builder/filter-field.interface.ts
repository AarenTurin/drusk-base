// configuration object for database result filterinng - match

export interface FilterField {
    // Origin Table
    origin?: string;
    field: string;

    value: any;
}