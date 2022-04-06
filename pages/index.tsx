import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import BigRoad from '../components/BigRoad'
import DishRoad from '../components/DishRoad'
import EyeRoad from '../components/EyeRoad'
import BigRoadIcon from '../components/small/BigRoadIcon'
import { test, genFakeResult, genFakeBigRoadResult, results } from '../utils/test'
import { EEyeRoadType, EResultType, ERoadType, IBigRoadData, IRawData, IRoadMap, IRoadResult } from '../utils/types'

const Home: NextPage = () => {
  const [roadMap, setRoadMap] = useState<IRoadMap>(results)
  useEffect(() => {
    test(50)  
    // force refresh view by setting new obj
    setRoadMap(JSON.parse(JSON.stringify(results)))
  }, [])
  return (
    <div>
      <div className='flex flex-col'>
        <BigRoad  bigRoadData={roadMap[ERoadType.Big]}/>
        <div className='flex flex-row basis-30% justify-start'>
          <EyeRoad eyeRoadData={roadMap[ERoadType.BigEye]} title={"BigEye"} roadStyle={EEyeRoadType.Big}/>
          <EyeRoad eyeRoadData={roadMap[ERoadType.SmallEye]} title={"SmallEye"} roadStyle={EEyeRoadType.Small}/>
          <EyeRoad eyeRoadData={roadMap[ERoadType.Cockroach]} title={"Cockroach"} roadStyle={EEyeRoadType.Cockroach}/>
        </div>
        <DishRoad dishRoadData={roadMap[ERoadType.Dish]}/>
      </div>
    </div>
  )
}

export default Home
