import React, { useState } from 'react'

export default function PreparingOrders({ orders, onOrderComplete }) {
  const [expandedOrders, setExpandedOrders] = useState(new Set())
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  const toggleOrder = (orderId) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(orderId)) {
        newSet.delete(orderId)
      } else {
        newSet.add(orderId)
      }
      return newSet
    })
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const orderDate = new Date(timestamp)
    const diffTime = Math.abs(now - orderDate)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    // Format time as HH:MM AM/PM
    const timeString = orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    if (diffDays === 0) {
      return `Today ${timeString}`
    } else if (diffDays === 1) {
      return `Yesterday ${timeString}`
    } else if (diffDays < 7) {
      return `${orderDate.toLocaleDateString([], { weekday: 'long' })} ${timeString}`
    } else {
      return orderDate.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })
    }
  }

  const calculateOrderTotal = (order) => {
    const itemsTotal = order.readyItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const customTotal = order.custom ? order.custom.quantity * 4.5 : 0
    return (itemsTotal + customTotal).toFixed(2)
  }

  const handleCompleteClick = (orderId, e) => {
    e.stopPropagation()
    setSelectedOrderId(orderId)
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    onOrderComplete(selectedOrderId)
    setShowConfirmation(false)
    setSelectedOrderId(null)
  }

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-amber-800 text-xl font-medium">No orders in preparation</p>
          <p className="text-amber-600 text-base mt-2">New orders will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="border border-amber-200 rounded-lg bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div 
                className="p-3 md:p-4 cursor-pointer hover:bg-amber-50 flex justify-between items-start"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-amber-900 text-base md:text-lg">{order.customerName}</h3>
                  <div className="mt-1 flex items-center">
                    <p className="text-amber-600 text-sm">{formatTime(order.timestamp)}</p>
                    <span className="mx-1 text-amber-400">•</span>
                    <p className="text-amber-500 text-xs">#{order.id.toString().slice(-4)}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end ml-4">
                  <p className="font-bold text-amber-900 text-lg md:text-xl">${calculateOrderTotal(order)}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleOrder(order.id)
                      }}
                      className=" text-amber-500 hover:text-amber-600 transition-colors"
                      title={expandedOrders.has(order.id) ? "Show Less" : "Show More"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expandedOrders.has(order.id) ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => handleCompleteClick(order.id, e)}
                      className=" bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                      title="Complete Order"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  " viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {expandedOrders.has(order.id) && (
                <div className="px-3 md:px-4 pb-3 md:pb-4 border-t border-amber-100">
                  <div className="py-3 md:py-4 space-y-2 md:space-y-3">
                    {order.readyItems.map((item) => (
                      <div key={item.name} className="flex justify-between items-center bg-amber-50 p-2 md:p-3 rounded-lg">
                        <div>
                          <span className="font-medium text-amber-800 text-sm md:text-base">{item.quantity} × {item.name}</span>
                        </div>
                        <span className="text-amber-700 font-medium text-sm md:text-base">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {order.custom && (
                      <div className="bg-amber-50 p-2 md:p-3 rounded-lg space-y-2">
                        <div className="font-medium text-amber-800 text-sm md:text-base">Custom Order</div>
                        <div className="text-amber-700 text-sm md:text-base">{order.custom.description}</div>
                        <div className="flex justify-between items-center">
                          <div className="text-amber-600 text-sm">
                            Quantity: {order.custom.quantity}×
                          </div>
                          <div className="text-amber-600 text-sm">
                            ${(order.custom.quantity * 4.5).toFixed(2)}
                          </div>
                        </div>
                        {order.custom.toppings.length > 0 && (
                          <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
                            {order.custom.toppings.map(topping => (
                              <span 
                                key={topping}
                                className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                              >
                                {topping}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={(e) => handleCompleteClick(order.id, e)}
                    className="mt-3 md:mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm md:text-base flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mark as Complete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white  p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl text-black/85 black:text-white/80 font-bold mb-4">Confirm Order Completion</h2>
            <p className="text-black/85 black:text-white/80">Are you sure you want to mark this order as complete?</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => {
                  setShowConfirmation(false)
                  setSelectedOrderId(null)
                }}
                className="px-4 py-2 bg-gray-500 black:text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-500 black:text-white rounded-md hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 