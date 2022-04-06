import React from 'react'
import { EResultType, IBigRoadData } from '../../utils/types'
import BankerPair from './BankerPair'
import PlayerPair from './PlayerPair'

function BigRoadIcon(data: IBigRoadData) {
  const { resultType, drawCounter, isBankerPair, isPlayerPair } = data
  const colorClass =
    resultType == EResultType.Banker ? 'border-red-600' : 'border-blue-600'
  return (
    <div className="relative border">
      {isBankerPair ? <BankerPair /> : null}
      <div
        className={`${colorClass} m-0.5 flex 
        h-5 w-5 items-center
        justify-center rounded-full border-2
        text-green-700`}
      >
        {drawCounter != 0 ? drawCounter : ''}
      </div>
      {isPlayerPair ? <PlayerPair /> : null}
    </div>
  )
}

export default BigRoadIcon
