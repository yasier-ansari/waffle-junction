import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function CompletedOrders({ orders, onDeleteOrder, onClearAll }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedOrders, setExpandedOrders] = useState(new Set())
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showClearModal, setShowClearModal] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState(null)

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

  const handleDeleteClick = (order, e) => {
    e.stopPropagation()
    setOrderToDelete(order)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (orderToDelete) {
      onDeleteOrder(orderToDelete.id)
      toast.success('Order deleted successfully')
      setShowDeleteModal(false)
      setOrderToDelete(null)
    }
  }

  const confirmClearAll = () => {
    onClearAll()
    toast.success('All completed orders cleared')
    setShowClearModal(false)
  }

  const filteredOrders = orders.filter(order => {
    if (!order) return false;
    const searchLower = searchTerm.toLowerCase()
    return (
      (order.customerName?.toLowerCase() || '').includes(searchLower) ||
      (order.readyItems?.some(item => item?.name?.toLowerCase().includes(searchLower)) || false) ||
      (order.custom?.description?.toLowerCase().includes(searchLower) || false)
    )
  })

  return (
    <div className={`space-y-4 w-full `}>
      <div className="sticky top-0 bg-white p-3 md:p-4 -mx-4 md:-mx-6 -mt-4 md:-mt-6 mb-4 shadow-sm border-b z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search orders..."
                className="w-full p-2 md:p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-sm md:text-base"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {orders.length > 0 && (
              <button
                onClick={() => setShowClearModal(true)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm md:text-base flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-8">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-amber-800 text-xl font-medium">No completed orders found</p>
          <p className="text-amber-600 text-base mt-2">Completed orders will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {filteredOrders.map((order) => (
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
                      className="p-1.5 text-amber-500 hover:text-amber-600 transition-colors"
                      title={expandedOrders.has(order.id) ? "Show Less" : "Show More"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expandedOrders.has(order.id) ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(order, e)}
                      className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Delete Order"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                    onClick={(e) => handleDeleteClick(order, e)}
                    className="mt-3 md:mt-4 w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm md:text-base flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Order
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 opacity-100">
            <h3 className="text-xl font-bold text-amber-900 mb-4">Delete Order</h3>
            <p className="text-amber-700 text-base mb-6">
              Are you sure you want to delete this order? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-amber-200 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 opacity-100">
            <h3 className="text-xl font-bold text-amber-900 mb-4">Clear All Orders</h3>
            <p className="text-amber-700 text-base mb-6">
              Are you sure you want to delete all completed orders? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowClearModal(false)}
                className="px-4 py-2 border border-amber-200 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearAll}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 