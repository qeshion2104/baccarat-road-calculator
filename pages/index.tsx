import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import BigRoad from '../components/BigRoad'
import BigRoadIcon from '../components/BigRoadIcon'
import { test, genFakeResult, genFakeBigRoadResult } from '../utils/test'
import { IBigRoadData, IRawData } from '../utils/types'

const Home: NextPage = () => {
  const [rawData, setRawData] = useState<Array<IRawData>>([])
  const [bigData, setBigData] = useState<Array<IBigRoadData>>([])
  useEffect(() => {
    // test()  
    setRawData(genFakeResult(10))
    setBigData(genFakeBigRoadResult(50))
  }, [])
  return (
    <div>
      <BigRoad bigRoadDatas={bigData}/>
    </div>
  )
}

export default Home
