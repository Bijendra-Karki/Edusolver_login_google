import { BrainCog, Users, Award, TrendingUp,HelpCircle } from "lucide-react";
import Navbar from "./Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-blue-100">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Experience  */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:bg-gradient-to-r from-blue-500 to-blue-900  text-center text-white">
            <div className="text-6xl font-bold text-white-900 mb-2">5</div>
            <p className="text-gray-600 text-lg">Years of Experience</p>
          </div>

          {/*Need Question */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-00 rounded-lg shadow-lg p-8 text-center text-white hover:bg-gradient-to-r from-blue-500 to-blue-900  text-center text-white">
            <p className="text-lg mb-2">Do you need</p>
            <h2 className="text-2xl font-bold">All In One PlatForm?</h2>
          </div>

          {/* Contact  */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:bg-gradient-to-r from-blue-500 to-blue-900   text-white">

            <p className="text-blue-600 hover:text-white  mb-2">Call us for free</p>
            <div className="text-2xl font-bold text-gray-900">
              9812855741
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              About EduSolver
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A EduSolver is a{" "}
              <span className="font-semibold">designed</span> to help students learn in an{" "}
              <span className="font-semibold">interactive and effective</span>  way by providing access to test, detailed performance tracking, and a doubt-solving forum where students can help each other. 
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              We provide Competitive exam solutions and preer Coordination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
              <TrendingUp className="w-12 h-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Exams</h3>
              <p className="text-gray-600">
                Provides all the study material and variety of exam that are recent asked in gaint company such as google and Microsoft
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
              <Users className="w-12 h-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Peer connetion</h3>
              <p className="text-gray-600">
               Student can interact with each other and can help each other in solving doubts
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
              <Award className="w-12 h-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reliable Source</h3>
              <p className="text-gray-600">
                Process improvement and enhance student learning experience with reliable and up-to-date resources
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
              <HelpCircle className="w-12 h-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Consultation and Dought-Solving</h3>
              <p className="text-gray-600">
                Expert advice and professional guidance
              </p>
            </div>
          </div>
        </section>

        {/* subscription Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-900 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform You in Expert?
          </h2>
          <p className="text-xl mb-8">
            	Finding personalized practice questions for subjects and Solving doubts quickly, especially to get your Ambition

          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Subscription
            </button>
            <button className="border-2 border-white text-blue-900 hover:bg-blue-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-500 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">EduSolver</h3>
              <p className="text-gray-400">
                Professional IT Student Career Booster.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Doubt-Solving
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                   Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                  Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                  Engagement and Preparation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="text-gray-400 space-y-2">
                <p>9812855741</p>
                <p>edusolver@171gmail.com</p>
                <p>
                  Lumbini Provience, Nepal
                  <br />
                  Dang,2400
                  <br />
                  Ghoarhi
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EduSolver. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
