import React from 'react'
import { IBigRoadData, IRoadResult } from '../utils/types'
import Road from './Road'
import BigRoadIcon from './small/BigRoadIcon'
import EmptyIcon from './small/EmptyIcon'

function BigRoad({ bigRoadData } : {bigRoadData: IRoadResult<IBigRoadData>}) {
  const arr: Array<JSX.Element> = []
  bigRoadData.board.forEach((dataArr: Array<IBigRoadData>, i: number) => {
    dataArr.forEach((data: IBigRoadData, j: number) => {
        const key = `bigIcon_${i}_${j}`
        arr.push((
            data ? <BigRoadIcon key={key} {...data} /> : <EmptyIcon key={key}/>
        ))
    })
  })
  return (
    <Road title='BigRoad'>
      {arr}
    </Road>
  )
}

export default BigRoad
