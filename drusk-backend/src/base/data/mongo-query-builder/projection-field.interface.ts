// Configuration Object for database projection

export interface ProjectionField {
    // Origin table
    origin: string;
    field: string;

    projectOntoField: string;
}