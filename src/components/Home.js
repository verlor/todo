import React from 'react'
import Header from '../containers/Header'
import MainSection from '../containers/MainSection'

const Home = ({ cookies }) => (
  <>
    <Header />
    <MainSection cookies={cookies} />
  </>
)

export default Home
