import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import BigRoad from '../components/BigRoad'
import EyeRoad from '../components/EyeRoad'
import BigRoadIcon from '../components/small/BigRoadIcon'
import { test, genFakeResult, genFakeBigRoadResult, results } from '../utils/test'
import { EResultType, ERoadType, IBigRoadData, IRawData, IRoadMap, IRoadResult } from '../utils/types'

const Home: NextPage = () => {
  const [rawData, setRawData] = useState<Array<IRawData>>([])
  const [bigData, setBigData] = useState<Array<IBigRoadData>>([])
  const [roadMap, setRoadMap] = useState<IRoadMap>(results)
  useEffect(() => {
    test()  
    setRawData(genFakeResult(10))
    setBigData(genFakeBigRoadResult(50))
    setRoadMap(results)
    console.warn(results)
  }, [])
  return (
    <div>
      <div className='flex flex-col'>
        <BigRoad {...roadMap[ERoadType.Big] as IRoadResult<IBigRoadData>}/>
        <div className='flex flex-row basis-30% justify-between'>
          <EyeRoad eyeRoadData={roadMap[ERoadType.BigEye]} title={"BigEye"}/>
          {/* <BigRoad {...roadMap[ERoadType.Big] as IRoadResult<IBigRoadData>}/>
          <BigRoad {...roadMap[ERoadType.Big] as IRoadResult<IBigRoadData>}/> */}
        </div>
      </div>
    </div>
  )
}

export default Home
