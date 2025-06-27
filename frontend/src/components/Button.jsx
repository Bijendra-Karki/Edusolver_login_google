import React from 'react'

function Button(props) {
  const { label, onClick, disabled, icon } = props

  return (
    <button
      className={`
        bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25
        px-2 py-3
        text-white border-2 border-white rounded-xl font-semibold cursor-pointer
        transition-all duration-300 shadow-lg
        hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02]
        active:translate-y-0 active:scale-[0.98] active:duration-75
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg
        flex items-center justify-center gap-2 relative overflow-hidden
        before:absolute before:inset-0 
        before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
        before:translate-x-[-100%] before:transition-transform before:duration-700
        hover:before:translate-x-[100%]
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        {label}
      </span>
    </button>
  )
}

export default Button
