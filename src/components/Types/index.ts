export interface CarData {
    CarMake         : string;
    CarModel        : string;
    Year            : string;
    'EngineSize(L)' : string;
    Horsepower      : string;
    'Price(USD)'    : string;
    'Torque(Nm)'    : string;
    '0-60(mph)'     : string;
}


export interface GroupedCircleData extends CarData {
    fx?: number | string | null;
    fy?: number | string | null;
}