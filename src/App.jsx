import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import toast, { Toaster } from 'react-hot-toast'
import Navigation from './components/Navigation'
import OrderForm from './components/OrderForm'
import PreparingOrders from './components/PreparingOrders'
import CompletedOrders from './components/CompletedOrders'

export default function App() {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders')
    return saved ? JSON.parse(saved) : []
  })

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('completedOrders')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
    localStorage.setItem('completedOrders', JSON.stringify(completed))
  }, [orders, completed])

  useEffect(() => {
    const filtered = completed.filter((o) => {
      const age = Date.now() - o.timestamp
      return age < 1000 * 60 * 60 * 24 * 2 // 2 days
    })
    if (filtered.length !== completed.length) {
      setCompleted(filtered)
    }
  }, [])

  const handleCreateOrder = (newOrder) => {
    setOrders([...orders, newOrder])
  }

  const handleOrderComplete = (id) => {
    const done = orders.find((o) => o.id === id)
    setOrders(orders.filter((o) => o.id !== id))
    setCompleted([...completed, done])
    toast.success('Order completed')
  }

  const handleDeleteOrder = (id) => {
    setCompleted(completed.filter((o) => o.id !== id))
  }

  const handleClearAll = () => {
    setCompleted([])
  }

  return (
    <div className="min-h-screen flex items-center justify-center min-w-full bg-gradient-to-br from-amber-500 to-amber-100">
    <Toaster position="top-center" />
    <Router>
      <div className=" min-w-full min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
        <Navigation />
        <div className="w-full px-4 py-6">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="flex flex-col lg:flex-row gap-6 max-w-[2000px] mx-auto">
                  <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-sm p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">New Order</h2>
                    <OrderForm onCreateOrder={handleCreateOrder} />
                  </div>
                  <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">👨‍🍳 Preparing Orders</h2>
                    <PreparingOrders 
                      orders={orders} 
                      onOrderComplete={handleOrderComplete} 
                    />
                  </div>
                </div>
              } 
            />
            <Route 
              path="/completed" 
              element={
                <div className="max-w-[2000px] mx-auto">
                  <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">✅ Completed Orders</h2>
                    <CompletedOrders 
                      orders={completed} 
                      onDeleteOrder={handleDeleteOrder}
                      onClearAll={handleClearAll}
                    />
                  </div>
                </div>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  )
} 