import React from 'react'
import { EResultType, IBigRoadData, IRawData } from '../../utils/types'
import BankerPair from './BankerPair'
import PlayerPair from './PlayerPair'

function DishIcon(data: IRawData) {
  const { resultType, isBankerPair, isPlayerPair } = data
  let colorClass = 'border-red-600 bg-red-600'
  switch (resultType) {
    case EResultType.Banker:
        colorClass = 'border-red-600 bg-red-600'
        break
    case EResultType.Player:
        colorClass = 'border-blue-600 bg-blue-600'
        break
    case EResultType.Draw:
        colorClass = 'border-green-600 bg-green-600'
        break
  }
  return (
    <div className="relative border">
      {isBankerPair ? <BankerPair /> : null}
      <div
        className={`${colorClass} m-0.5 flex 
        h-5 w-5 items-center
        justify-center rounded-full border-2
        `}
      ></div>
      {isPlayerPair ? <PlayerPair /> : null}
    </div>
  )
}

export default DishIcon
