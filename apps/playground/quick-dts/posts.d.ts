export interface Dts {
    data:  Datum[];
    meta:  Meta;
    links: Links;
}

export interface Datum {
    id:            string;
    type:          DatumType;
    attributes:    Attributes;
    relationships: Relationships;
}

export interface Attributes {
    name:           string;
    description:    string;
    life:           FemaleWeight;
    male_weight:    FemaleWeight;
    female_weight:  FemaleWeight;
    hypoallergenic: boolean;
}

export interface FemaleWeight {
    max: number;
    min: number;
}

export interface Relationships {
    group: Group;
}

export interface Group {
    data: Data;
}

export interface Data {
    id:   string;
    type: DataType;
}

export enum DataType {
    Group = "group",
}

export enum DatumType {
    Breed = "breed",
}

export interface Links {
    self:    string;
    current: string;
    next:    string;
    last:    string;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    current: number;
    next:    number;
    last:    number;
    records: number;
}

