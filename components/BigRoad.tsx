import React from 'react'
import { IBigRoadData } from '../utils/types'
import BigRoadIcon from './BigRoadIcon'

function BigRoad({ bigRoadDatas }: { bigRoadDatas: Array<IBigRoadData> }) {
    const colCount = Math.floor(bigRoadDatas.length / 6) + 1;
  return (
    <div className='flex flex-row items-start'>
        <div className='h-40
            text-lg text-center border-2 my-1 px-1'
            style={{
                writingMode: "vertical-rl",
                textOrientation: "upright",
            }}
        >
            BigRoad
        </div>
        <div className={`
            flex flex-col flex-wrap items-start
            h-40
            my-1
            py-0.5
        `}
            style={{
                width: `${(colCount / 6 * 0.25)}rem`
            }}
        >
        {bigRoadDatas.map((data: IBigRoadData, index: number) => {
            return <BigRoadIcon key={'bigIcon' + index} {...data} />
        })}
        </div>
    </div>
  )
}

export default BigRoad
