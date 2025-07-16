import React from 'react'
import HeroSection from '@/components/acenternityUi/HeroSection'
import FeaturedCourses from '@/components/acenternityUi/FeaturedCourses'
import TestimonialCards from '@/components/acenternityUi/TestimonialCards'  
import Instructors from '@/components/acenternityUi/Instructor'
import Footer from '@/components/acenternityUi/Footer'
function page() {
  return (
    <main className="min-h-screen  antialiased" >
      <HeroSection/>
      <FeaturedCourses />
      <TestimonialCards />
      <Instructors />
      <Footer />
    </main> 
  )
}

export default page
