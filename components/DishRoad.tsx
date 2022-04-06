import React from 'react'
import { IRawData, IRoadResult } from '../utils/types'
import Road from './Road'
import DishIcon from './small/DishIcon'
import EmptyIcon from './small/EmptyIcon'

function DishRoad({ dishRoadData } : { dishRoadData: IRoadResult<IRawData> }) {
    const arr: Array<JSX.Element> = []
    dishRoadData.board.forEach((dataArr: Array<IRawData>, i: number) => {
      dataArr.forEach((data: IRawData, j: number) => {
          const key = `dishIcon_${i}_${j}`
          arr.push((
              data ? <DishIcon key={key} {...data} /> : <EmptyIcon key={key}/>
          ))
      })
    })
    return (
      <Road title='DishRoad'>
        {arr}
      </Road>
    )
}

export default DishRoad
