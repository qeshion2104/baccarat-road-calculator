// #region normal type
export enum ERoadType {
    Big,
    BigEye,
    SmallEye,
    Dish,
    Cockroach,
}

export interface IRoadConfig {
    row: number,
    column: number,
}

export interface IRoadMap {
    [ERoadType.Big]: IRoadResult<IBigRoadData>,
    [ERoadType.BigEye]: IRoadResult<EResultType>,
    [ERoadType.SmallEye]: IRoadResult<EResultType>,
    [ERoadType.Cockroach]: IRoadResult<EResultType>,
    [ERoadType.Dish]: IRoadResult<IRawData>,
}

export interface IRoadResult<T> {
    board: Array<Array<T>>
    data: Array<IColDatas<T>>
}

export enum EResultType {
    None = 0, // empty
    Banker = 1, // red
    Player = 2, // blue
    Draw = 3,   // green
}


export interface IRawData {
    resultType: EResultType,
    isBankerPair: boolean,
    isPlayerPair: boolean,
}

// #endregion normal type
// #region big road type
export interface IColDatas<T> {
    colDatas: Array<T>,
}

export interface IBigRoadData {
    resultType: EResultType,
    drawCounter: number,
    isBankerPair: boolean,
    isPlayerPair: boolean,
}
// #endregion big road type

// #region UI Type
export enum EEyeRoadType {
    Big,
    Small,
    Cockroach,
}

// #endregion UI Type