import { Home, ChevronRight } from "lucide-react"

export function BreadCrumb() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Home className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">About</span>
        </div>
      </div>
    </div>
  )
}
