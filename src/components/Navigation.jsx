import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-amber-900 text-xl md:text-2xl font-bold">Waffle Junction</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? 'border-amber-500 text-amber-900'
                      : 'border-transparent text-amber-600 hover:border-amber-300 hover:text-amber-700'
                  }`
                }
              >
                New Order
              </NavLink>
              <NavLink
                to="/completed"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? 'border-amber-500 text-amber-900'
                      : 'border-transparent text-amber-600 hover:border-amber-300 hover:text-amber-700'
                  }`
                }
              >
                Completed Orders
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive
                  ? 'bg-amber-50 border-amber-500 text-amber-900'
                  : 'border-transparent text-amber-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700'
              }`
            }
          >
            New Order
          </NavLink>
          <NavLink
            to="/completed"
            className={({ isActive }) =>
              `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive
                  ? 'bg-amber-50 border-amber-500 text-amber-900'
                  : 'border-transparent text-amber-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700'
              }`
            }
          >
            Completed Orders
          </NavLink>
        </div>
      </div>
    </nav>
  )
} 