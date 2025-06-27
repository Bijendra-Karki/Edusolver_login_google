import { BrainCog, Users, Award, TrendingUp, HelpCircle, Sliders } from "lucide-react";
import { Home, ChevronRight } from "lucide-react";
import Navbar from "../ToperFooter/Navbar";
import Slide from "./Slide";
import Footer from "../ToperFooter/Footer";
import { BreadCrumb } from "../ToperFooter/BreadCrumb";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-blue-100 flex flex-col">

      {/* Header */}
      <Navbar />
      <BreadCrumb content="Home" icon1={Home} icon2={ChevronRight} />
      {/* slider */}
      <Slide />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="rounded-lg shadow-lg p-8 text-center bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-transform duration-300">
            <div className="text-6xl font-bold text-white mb-2">5</div>
            <p className="text-lg text-white">Years of Experience</p>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg shadow-lg p-8 text-center bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-transform duration-300">
            <p className="text-lg mb-2 text-white">Do You Need</p>
            <h2 className="text-2xl font-bold text-white">All In One Platform?</h2>
          </div>

          {/* Card 3 */}
          <div className="rounded-lg shadow-lg p-8 text-center bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-transform duration-300">
            <p className="text-white mb-2">Call us for free</p>
            <div className="text-2xl font-bold text-white">9812855741</div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-center  hover:scale-105">
              <TrendingUp className="w-12 h-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Exams</h3>
              <p className="text-gray-600">
                Provides all the study material and variety of exam that are recent asked in gaint company such as google and Microsoft
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-center  hover:scale-105">
              <Users className="w-12 h-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Peer connetion</h3>
              <p className="text-gray-600">
                Student can interact with each other and can help each other in solving doubts
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-center  hover:scale-105">
              <Award className="w-12 h-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reliable Source</h3>
              <p className="text-gray-600">
                Process improvement and enhance student learning experience with reliable and up-to-date resources
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-center  hover:scale-105">
              <HelpCircle className="w-12 h-12 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Consultation and Dought-Solving</h3>
              <p className="text-gray-600">
                Expert advice and professional guidance
              </p>
            </div>
          </div>
        </section>

        {/* subscription Section */}
        <section className="bg-blue-900 rounded-2xl p-12 text-center text-white">
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
            <button className="border-2 border-white text-white-900 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
