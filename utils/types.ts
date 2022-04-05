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
    [ERoadType.Big]: {
        board: Array<Array<IBigRoadData>>
        data: Array<IColDatas<IBigRoadData>>
    },
    [ERoadType.BigEye]: {
        board: Array<Array<EResultType>>
        data: Array<IColDatas<EResultType>>
    },
    [ERoadType.SmallEye]: IRoadResult<any>,
    [ERoadType.Cockroach]: IRoadResult<any>,
    [ERoadType.Dish]: IRoadResult<any>,
}

export interface IRoadResult<T> {
    board: Array<Array<T>>
    data: Array<T>
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
