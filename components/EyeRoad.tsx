import React from 'react'
import { EResultType, IBigRoadData, IRoadResult } from '../utils/types'
import Road from './Road'
import EmptyIcon from './small/EmptyIcon'
import EyeRoadIcon from './small/EyeRoadIcon'

function EyeRoad({ title, eyeRoadData } : { title: string, eyeRoadData: IRoadResult<EResultType> }) {
  const arr: Array<JSX.Element> = []
  eyeRoadData.board.forEach((dataArr: Array<EResultType>, i: number) => {
    dataArr.forEach((data: EResultType, j: number) => {
        const key = `${title}_eyeIcon_${i}_${j}`
        arr.push((
            data ? <EyeRoadIcon key={key} type={data} /> : <EmptyIcon key={key}/>
        ))
    })
  })

  return (
    <Road title={title}>
      {arr}
    </Road>
  )
}

export default EyeRoad
