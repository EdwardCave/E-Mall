import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'
import NewArrivals from '../components/NewArrivals'
import PopularProducts from '../components/PopularProducts'
import Banner from '../components/Banner'
import About from '../components/About'
import Blog from '../components/Blog'
import NewsLetter from '../components/NewsLetter'
const Home = () => {
  return (
    <>
    <Hero/>
    <Features/>
    <NewArrivals/>
    <PopularProducts/>
    <Banner/>
    <About/>
    <Blog/>
    <NewsLetter/>
    <Footer/>
    </>
  )
}

export default Home