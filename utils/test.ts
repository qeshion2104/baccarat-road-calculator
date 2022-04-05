import { getRandomInt } from "./math"
import { EResultType, ERoadType, IColDatas, IBigRoadData, IRawData, IRoadConfig, IRoadMap, IRoadResult } from "./types"

const configs: { [key: number]: IRoadConfig } = {
    [ERoadType.Big]: {
        row: 6,
        column: 10,
    },
    [ERoadType.BigEye]: {
        row: 6,
        column: 10,
    },
    [ERoadType.SmallEye]: {
        row: 6,
        column: 10,
    },
    [ERoadType.Cockroach]: {
        row: 6,
        column: 10,
    },
    [ERoadType.Dish]: {
        row: 6,
        column: 10,
    },
}

const results: IRoadMap = {
    [ERoadType.Big]: {
        board: [],
        data: []
    },
    [ERoadType.BigEye]: {
        board: [],
        data: []
    },
    [ERoadType.SmallEye]: {
        board: [],
        data: []
    },
    [ERoadType.Cockroach]: {
        board: [],
        data: []
    },
    [ERoadType.Dish]: {
        board: [],
        data: []
    },
}


// #region raw data
function genFakeResult(count: number): Array<IRawData> {
    let arr: Array<IRawData> = []
    for (let i = 0; i < count; i++) {
        arr.push({
            resultType: getRandomInt(1, 3) as EResultType,
            isBankerPair: getRandomInt(1, 2) == 1,
            isPlayerPair: getRandomInt(1, 2) == 1,
        })
    }
    return arr
}
// #endregion raw data
// #region BigRoad
// for data test only
const bigRoadSymbol = {
    banker: "R", // red
    player: "B", // blue
    draw: "_%s", // counter
    bankerPair: "RP_", //red dot on left top
    playerPair: "_BP", //blue dot on right bottom
    
}


function updateBigRoad(rawDatas: Array<IRawData>) {
    const board = results[ERoadType.Big].board
    const rowLimit = configs[ERoadType.Big].row
    const colLimit = configs[ERoadType.Big].column

    let tempBigRoadDatas: Array<IBigRoadData> = [] 
    let bigRoadCounter = -1
    
    let previousType: EResultType = EResultType.None
    let bigRowColDatas: Array<IColDatas<IBigRoadData>> = []
    
    // gen big road datas
    rawDatas.forEach(({resultType, isBankerPair, isPlayerPair}) => {
        if (resultType == EResultType.Banker || resultType == EResultType.Player) {
            if (bigRoadCounter != -1 && tempBigRoadDatas[bigRoadCounter].resultType == EResultType.Draw) {
                tempBigRoadDatas[bigRoadCounter].resultType = resultType
                tempBigRoadDatas[bigRoadCounter].isBankerPair = isBankerPair
                tempBigRoadDatas[bigRoadCounter].isPlayerPair = isPlayerPair
            } else {
                let data = {
                    resultType,
                    drawCounter: 0,
                    isBankerPair,
                    isPlayerPair,
                }
                tempBigRoadDatas.push(data)
                bigRoadCounter++
            }
        } else if (resultType == EResultType.Draw) {
            if (bigRoadCounter == -1) {
                let data = {
                    resultType,
                    drawCounter: 1,
                    isBankerPair: false,
                    isPlayerPair: false,
                }
                tempBigRoadDatas.push(data)
                bigRoadCounter++
            } else {
                tempBigRoadDatas[bigRoadCounter].drawCounter += 1
            }
        } else {
            console.error("updateBigRoad: No support type", resultType)
        }
    })

    tempBigRoadDatas.forEach((data: IBigRoadData, index) => {
        if (previousType != data.resultType) {
            bigRowColDatas.push({ colDatas: [] })
        }
        bigRowColDatas[bigRowColDatas.length - 1].colDatas.push(data)
    })

    console.log("updateBigRoad: bigRowColDatas ==>", bigRowColDatas)
    
    // draw bigRoad
    let colIndex = -1;
    let rowIndex = 0;
    
    // bigRoadDatas.forEach(({resultType, drawCounter, isBankerPair, isPlayerPair}, index) => {
    //     // move index
    //     let isMovingToNextLine: boolean = false
    //     if (index == 0) {
    //         // move to next line
    //         colStarterIndex++;
    //         colIndex++;
    //         rowIndex = 0
    //         isMovingToNextLine = true
    //     } else {
    //         let preData = bigRoadDatas[index - 1]
    //         let isSameType = resultType == preData.resultType
    //         if (isSameType) {
    //             let isNotOverLimit = colIndex < colLimit && rowIndex < rowLimit
    //             if (!isNotOverLimit) {
    //                 // over limit pass
    //                 return
    //             } else if (rowIndex + 1 < rowLimit) {
    //                 let isBlocked = board[colIndex][rowIndex + 1] != null
    //                 if (isBlocked) {
    //                     // move right
    //                     colIndex++;
    //                 } else {
    //                     // move down
    //                     rowIndex++;
    //                 }
    //             } else {
    //                 // move right            
    //                 colIndex++;
    //             }
    //         } else {
    //             // move to next line
    //             colStarterIndex++;
    //             colIndex = colStarterIndex;
    //             rowIndex = 0
    //             isMovingToNextLine = true
    //         }
    //     }

    //     if (isMovingToNextLine) {
    //         bigRowColDatas.push({ colDatas: [] })
    //     }

    //     // set data
    //     bigRowColDatas[colStarterIndex].colDatas.push(bigRoadDatas[index])
        
    //     let isNotOverLimit = colIndex < colLimit && rowIndex < rowLimit
    //     if (isNotOverLimit) {
    //         board[colIndex][rowIndex] = bigRoadDatas[index]
    //     } else {
    //         console.error("error: updateBigRoad: overlimit", colIndex, rowIndex, bigRoadDatas)
    //     }
    // })

    bigRowColDatas.forEach((BigColDatas: IColDatas<IBigRoadData>, colStarterIndex: number) => {
        // move to next line
        colIndex = colStarterIndex;
        rowIndex = -1

        BigColDatas.colDatas.forEach((data: IBigRoadData) => {
            // move index
            let isNotOverLimit = colIndex < colLimit && rowIndex < rowLimit
            if (!isNotOverLimit) {
                // over limit pass
                return
            } else if (rowIndex + 1 < rowLimit) {
                let isBlocked = board[colIndex][rowIndex + 1] != null
                if (isBlocked) {
                    // move right
                    colIndex++;
                } else {
                    // move down
                    rowIndex++;
                }
            } else {
                // move right            
                colIndex++;
            }


            // update board
            board[colIndex][rowIndex] = data
        })
    })
    results[ERoadType.Big].data = bigRowColDatas
}
// #endregion BigRoad

// #region BigEyeRoad
function updateBigEyeRoad(bigBoard: Array<Array<IBigRoadData>>, bigData: Array<IColDatas<IBigRoadData>>) {
    let startColIndex: number = 1
    let startRowIndex: number = 1

    // check 2 - 2
    if (bigBoard[1][1] == null) {
        // check 3 - 1
        if (bigBoard[2][0] == null) {
            // empty, no data
            return
        } else {
            startColIndex = 2;
            startRowIndex = 0;
        }
    } else {
        startColIndex = 1;
        startRowIndex = 1;
    }

    const bigEyeColDatas: Array<IColDatas<EResultType>> = []
    // start calculate
    // gen big eye road datas
    let previousType: EResultType = EResultType.Draw // used as empty
    bigData.forEach(({ colDatas }, colIndex: number) => {
        colDatas.forEach((data: IBigRoadData, rowIndex: number) => {
            if ((startColIndex > colIndex) || (startColIndex == colIndex && startRowIndex > rowIndex)) {
                return
            } else {
                let type = null
                if (rowIndex == 0) {
                    let isPreviousLineEqual = checkPreviousLineEqual(bigData, colIndex)
                    type = isPreviousLineEqual ? EResultType.Banker : EResultType.Player
                } else {
                    let isPreviousDotExist = checkPreviousDotExist(bigData, colIndex, rowIndex)
                    let isStraightFall = checkStraightFall(bigData, colIndex, rowIndex)
                    type = isStraightFall ? EResultType.Banker : isPreviousDotExist ? EResultType.Banker : EResultType.Player
                }
                
                if (type != previousType) {
                    bigEyeColDatas.push({ colDatas: [] })
                    previousType = type
                }
                bigEyeColDatas[bigEyeColDatas.length - 1].colDatas.push(type)
            }
        })
    })

    // draw bigRoad
    const board = results[ERoadType.BigEye].board
    const rowLimit = configs[ERoadType.BigEye].row
    const colLimit = configs[ERoadType.BigEye].column
    let colIndex = -1;
    let rowIndex = 0;
    let colStarterIndex = -1;
    bigEyeColDatas.forEach((EyeColDatas: IColDatas<EResultType>, i) => {
        // move to next line
        colStarterIndex++;
        colIndex = colStarterIndex;
        rowIndex = -1

        EyeColDatas.colDatas.forEach((data: EResultType, j) => {
            // move index
            let isNotOverLimit = colIndex < colLimit && rowIndex < rowLimit
            if (!isNotOverLimit) {
                // over limit pass
                return
            } else if (rowIndex + 1 < rowLimit) {
                let isBlocked = board[colIndex][rowIndex + 1] != null
                if (isBlocked) {
                    // move right
                    colIndex++;
                } else {
                    // move down
                    rowIndex++;
                }
            } else {
                // move right            
                colIndex++;
            }


            // update board
            board[colIndex][rowIndex] = data
        })
    })
    results[ERoadType.BigEye].data = bigEyeColDatas
}

function checkPreviousLineEqual(bigData: Array<IColDatas<IBigRoadData>>, colIndex: number) {
    if (colIndex < 2) {
        return false
    } else {
        return bigData[colIndex - 1].colDatas.length == bigData[colIndex - 2].colDatas.length
    }
}
function checkPreviousDotExist(bigData: Array<IColDatas<IBigRoadData>>, colIndex: number, rowIndex: number) {
    if (colIndex < 1) {
        return false
    } else {
        return bigData[colIndex - 1].colDatas.length > rowIndex
    }
}

function checkStraightFall(bigData: Array<IColDatas<IBigRoadData>>, colIndex: number, rowIndex: number) {
    if (colIndex < 1) {
        return false
    } else {
        return rowIndex >= bigData[colIndex - 1].colDatas.length + 1
    }
}

// #endregion BigEyeRoad

// #region basic 
function init() {
    for (let value in ERoadType) {
        if (!isNaN(Number(value))) {
            let numValue = parseInt(value)
            let config = configs[value]
            try {
                results[numValue as ERoadType].board = new Array(config.column)
                for (let i = 0; i < results[numValue as ERoadType].board.length; i++) {
                    results[numValue as ERoadType].board[i] = new Array(config.row).fill(null)
                }
            } catch (err) {
                console.error(err)
            }
        }
    }
    console.log("finish init")
}

function printResult() {
    printBoard(results[ERoadType.Big].board, results[ERoadType.Big].data, ERoadType.Big)

    printBoard(results[ERoadType.BigEye].board, results[ERoadType.BigEye].data, ERoadType.BigEye)
    // printBoard(results[ERoadType.SmallEye].board, configs[ERoadType.SmallEye], ERoadType[ERoadType.SmallEye])
    // printBoard(results[ERoadType.Cockroach].board, configs[ERoadType.Cockroach], ERoadType[ERoadType.Cockroach])
    
    // printBoard(results[ERoadType.Dish].board, configs[ERoadType.Dish], ERoadType[ERoadType.Dish])
}

function printBoard (board: Array<Array<any>>, data: any, type: ERoadType) {
    let convertBoard: Array<Array<string>> = []
    for (let i = 0; i < board.length; i++) {
        convertBoard.push([])
        for (let j = 0; j < board[i].length; j++) {
            const data = board[i][j]
            convertBoard[i].push(convertDataToSymbol(data, type))
        }   
    }
    console.table(convertBoard)
    console.log(ERoadType[type], "data: ", data)
}

function convertDataToSymbol(data: any, type: ERoadType): string {
    if (!data) {
        return "0"
    }
    switch (type) {
        case ERoadType.Big: {
            let symbol = ""
                // + (isBankerPair ? bigRoadSymbol.bankerPair : '')
                + (data.resultType == EResultType.Banker ? bigRoadSymbol.banker : data.resultType == EResultType.Player ? bigRoadSymbol.player : data.resultType == EResultType.Draw ? bigRoadSymbol.draw : '')
                + (data.resultType != EResultType.Draw && data.drawCounter > 0 ? bigRoadSymbol.draw : '')
                // + (isPlayerPair ? bigRoadSymbol.playerPair : '');
            symbol = symbol.replace("%s", `${data.drawCounter}`)
            return symbol 
        }
        case ERoadType.BigEye: {
            let symbol = data as EResultType == EResultType.Banker ? "R" : "B"
            return symbol
        }
    }
    return ""
}


export function test() {
    init()

    let fakeData = genFakeResult(5)
    console.log("Fake Data ==> ", fakeData)
    updateBigRoad(fakeData)
    updateBigEyeRoad(results[ERoadType.Big].board, results[ERoadType.Big].data)

    printResult()
}
// #endregion basic 