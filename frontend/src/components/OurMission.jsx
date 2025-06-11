import { Target, Eye, Award } from "lucide-react"

export function OurMission() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide exceptional advisory services that empower businesses and individuals to achieve their full potential through strategic guidance and innovative solutions.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be the leading advisory firm recognized for transforming lives and businesses through expert consultation and unwavering commitment to excellence.",
    },
    {
      icon: Award,
      title: "Our Values",
      description:
        "Integrity, excellence, innovation, and client-centricity form the foundation of everything we do. We believe in building lasting relationships based on trust and results.",
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">Our Foundation</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Built on strong principles and driven by a passion for excellence, we guide our clients toward success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transform group-hover:scale-105 transition-all duration-300">
                <value.icon className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
