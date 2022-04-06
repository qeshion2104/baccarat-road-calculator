import React from 'react'
import { IBigRoadData, IRoadResult } from '../utils/types'
import BigRoadIcon from './small/BigRoadIcon'
import EmptyIcon from './small/EmptyIcon'

function BigRoad(bigRoadData: IRoadResult<IBigRoadData>) {
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
        BigRoad
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
          width: `calc(${bigRoadData.board.length} * (1.5rem + 2px))`,
        }}
      >
          {arr}
      </div>
    </div>
  )
}

export default BigRoad
