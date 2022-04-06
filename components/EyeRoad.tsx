import React from 'react'
import { EResultType, IBigRoadData, IRoadResult } from '../utils/types'
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
    <div className="flex flex-row items-start">
      {/* title */}
      <div
        className="my-1
            h-40 border-2 px-1 text-center text-lg"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
        }}
      >
        {title}
      </div>
      {/* table */}
      <div
        className={`
            my-1 flex h-40 flex-col
            flex-wrap
            items-start
            py-0.5
        `}
        style={{
          width: `calc(${eyeRoadData.board.length} * (1.5rem + 2px))`,
        }}
      >
          {arr}
      </div>
    </div>
  )
}

export default EyeRoad
