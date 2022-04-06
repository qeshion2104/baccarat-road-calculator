import React from 'react'
import { EResultType, IBigRoadData } from '../utils/types'
import BankerPair from './small/BankerPair';
import PlayerPair from './small/PlayerPair';

function BigRoadIcon(data: IBigRoadData) {
    const {
        resultType,
        drawCounter,
        isBankerPair,
        isPlayerPair,
    } = data
  const colorClass = resultType == EResultType.Banker ? "border-red-600" : "border-blue-600";
  return (
    <div className='border relative'>
      { isBankerPair ? <BankerPair/> : null }
      <div className={`${colorClass} border-2 rounded-full 
        w-5 h-5 m-0.5
        flex justify-center items-center
        text-green-700`}>
        {drawCounter != 0 ? drawCounter : ''}
      </div>
      { isPlayerPair ? <PlayerPair/> : null }
    </div>
  )
}

export default BigRoadIcon
