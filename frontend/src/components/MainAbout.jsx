// In MainAbout.jsx
import Navbar from './Navbar'
import {WhatWeDone} from './WhatWeDone'
import { TeamSection } from './TeamSection'  // Changed to named import
import {CTASection} from './CTASection'
import Footer from './Footer'
import { BreadCrumb } from './BreadCrumb'
import { OurMission } from './OurMission'
import { About } from './About'  // Added missing import

export default function MainAbout() {
  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />
      <BreadCrumb/>
      <About/>
      <WhatWeDone />
      <OurMission />
      <TeamSection />
      <CTASection />
      <Footer />
    </div>
  )
}