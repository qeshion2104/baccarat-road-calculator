import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { test } from '../utils/test'

const Home: NextPage = () => {
  useEffect(() => {
    test()  
  }, [])
  return (
    <div>
      HI Baccarat Road Calculator!
    </div>
  )
}

export default Home
