import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'
import { faker } from '@faker-js/faker'

export default function OrderForm({ onCreateOrder }) {
  const [customerName, setCustomerName] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [customDescription, setCustomDescription] = useState('')
  const [customQuantity, setCustomQuantity] = useState(1)
  const [customToppings, setCustomToppings] = useState([])
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('waffles')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [discount, setDiscount] = useState('')

  const menuCategories = {
    waffles: {
      name: 'Waffles',
      items: [
        { id: 1, name: 'Classic Waffle', price: { small: 4.99, medium: 5.99, large: 6.99 } },
        { id: 2, name: 'Chocolate Waffle', price: { small: 5.99, medium: 6.99, large: 7.99 } },
        { id: 3, name: 'Strawberry Waffle', price: { small: 5.99, medium: 6.99, large: 7.99 } },
        { id: 4, name: 'Blueberry Waffle', price: { small: 5.99, medium: 6.99, large: 7.99 } },
        { id: 5, name: 'Banana Waffle', price: { small: 5.99, medium: 6.99, large: 7.99 } },
        { id: 6, name: 'Nutella Waffle', price: { small: 6.99, medium: 7.99, large: 8.99 } },
      ]
    },
    miniWaffles: {
      name: 'Mini Waffles',
      items: [
        { id: 7, name: 'Classic Mini Waffle', price: { small: 3.99, medium: 4.99, large: 5.99 } },
        { id: 8, name: 'Chocolate Mini Waffle', price: { small: 4.99, medium: 5.99, large: 6.99 } },
        { id: 9, name: 'Strawberry Mini Waffle', price: { small: 4.99, medium: 5.99, large: 6.99 } },
      ]
    },
    pancakes: {
      name: 'Pancakes',
      items: [
        { id: 10, name: 'Classic Pancake', price: { small: 4.99, medium: 5.99, large: 6.99 } },
        { id: 11, name: 'Chocolate Pancake', price: { small: 5.99, medium: 6.99, large: 7.99 } },
        { id: 12, name: 'Blueberry Pancake', price: { small: 5.99, medium: 6.99, large: 7.99 } },
      ]
    },
    miniPancakes: {
      name: 'Mini Pancakes',
      items: [
        { id: 13, name: 'Classic Mini Pancake', price: { small: 3.99, medium: 4.99, large: 5.99 } },
        { id: 14, name: 'Chocolate Mini Pancake', price: { small: 4.99, medium: 5.99, large: 6.99 } },
      ]
    },
    crackers: {
      name: 'Crackers',
      items: [
        { id: 15, name: 'Plain Cracker', price: { small: 2.99, medium: 3.99, large: 4.99 } },
        { id: 16, name: 'Chocolate Cracker', price: { small: 3.99, medium: 4.99, large: 5.99 } },
      ]
    }
  }

  const availableToppings = [
    'Whipped Cream',
    'Maple Syrup',
    'Chocolate Sauce',
    'Strawberry Sauce',
    'Caramel Sauce',
    'Ice Cream',
    'Fresh Fruits',
    'Nuts',
  ]

  const handleItemSelect = (item) => {
    const existingItem = selectedItems.find((i) => i.name === item.name && i.size === 'medium')
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((i) =>
          i.name === item.name && i.size === 'medium' ? { ...i, quantity: i.quantity + 1 } : i
        )
      )
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1, size: 'medium' }])
    }
  }

  const handleQuantityChange = (itemName, newQuantity) => {
    if (newQuantity < 1) return
    setSelectedItems(
      selectedItems.map((item) =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const handleSizeChange = (itemName, newSize) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.name === itemName ? { ...item, size: newSize } : item
      )
    )
  }

  const handleToppingToggle = (topping) => {
    setCustomToppings(
      customToppings.includes(topping)
        ? customToppings.filter((t) => t !== topping)
        : [...customToppings, topping]
    )
  }

  const getItemPrice = (item) => {
    return item.price[item.size]
  }

  const calculateSubtotal = () => {
    const itemsTotal = selectedItems.reduce((acc, item) => acc + getItemPrice(item) * item.quantity, 0)
    const customTotal = showCustomForm ? 4.99 * customQuantity : 0
    return itemsTotal + customTotal
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const discountAmount = parseFloat(discount) || 0
    return Math.max(0, subtotal - discountAmount).toFixed(2)
  }

  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value) || 0
    const subtotal = calculateSubtotal()
    setDiscount(Math.min(subtotal, Math.max(0, value)))
  }

  const generateRandomName = () => {
    // 50% chance of getting an Indian name
    if (Math.random() < 0.5) {
      const indianFirstNames = [
        'Aarav', 'Aditi', 'Arjun', 'Diya', 'Ishaan', 'Kavya', 'Krishna', 'Lakshmi', 
        'Neha', 'Priya', 'Rahul', 'Riya', 'Rohan', 'Sanya', 'Shiv', 'Tanvi'
      ]
      const indianLastNames = [
        'Patel', 'Singh', 'Kumar', 'Shah', 'Sharma', 'Verma', 'Gupta', 'Malhotra', 
        'Kapoor', 'Joshi', 'Reddy', 'Mehta', 'Chopra', 'Desai', 'Bhat', 'Rao'
      ]
      const randomFirstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)]
      const randomLastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)]
      return `${randomFirstName} ${randomLastName}`
    }
    return faker.person.fullName()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedItems.length === 0 && !showCustomForm) {
      toast.error('Please select at least one item')
      return
    }

    const order = {
      id: uuidv4(),
      customerName: customerName.trim() || generateRandomName(),
      readyItems: selectedItems.map(item => ({
        ...item,
        price: getItemPrice(item)
      })),
      custom: showCustomForm
        ? {
            description: customDescription.trim(),
            quantity: customQuantity,
            toppings: customToppings,
            price: 4.99
          }
        : null,
      timestamp: Date.now(),
      discount: parseFloat(discount) || 0,
      total: parseFloat(calculateTotal())
    }

    onCreateOrder(order)
    setCustomerName('')
    setSelectedItems([])
    setCustomDescription('')
    setCustomQuantity(1)
    setCustomToppings([])
    setShowCustomForm(false)
    setShowConfirmation(false)
    setDiscount('')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="customerName" className="block text-amber-800 font-medium text-base mb-2">
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-2 md:p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-amber-900 text-base"
            placeholder="Enter customer name"
          />
        </div>

        <div>
          <label className="block text-amber-800 font-medium text-base mb-2">
            Menu Categories
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(menuCategories).map(([key, category]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === key
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {menuCategories[selectedCategory].items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemSelect(item)}
                className="p-2 md:p-3 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors text-left"
              >
                <div className="font-medium text-amber-900 text-sm md:text-base">{item.name}</div>
                <div className="text-amber-600 text-sm">
                  S: ${item.price.small} | M: ${item.price.medium} | L: ${item.price.large}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div>
            <h3 className="text-amber-800 font-medium text-base mb-2">Selected Items</h3>
            <div className="space-y-2">
              {selectedItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2 md:p-3 bg-amber-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-amber-900 text-sm md:text-base">{item.name}</span>
                    <div className="flex gap-2 mt-1">
                      {['small', 'medium', 'large'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeChange(item.name, size)}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                            item.size === size
                              ? 'bg-amber-500 text-white'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                        >
                          {size.charAt(0).toUpperCase()}
                        </button>
                      ))}
                    </div>
                    <span className="text-amber-600 text-sm ml-2">${getItemPrice(item).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.name, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors text-amber-700 font-medium"
                    >
                      -
                    </button>
                    <span className="text-amber-900 font-medium text-sm md:text-base w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.name, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors text-amber-700 font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <button
            type="button"
            onClick={() => setShowCustomForm(!showCustomForm)}
            className="w-full p-2 md:p-3 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors text-amber-700 font-medium text-base"
          >
            {showCustomForm ? 'Hide Custom Order' : 'Add Custom Order'}
          </button>
        </div>

        {showCustomForm && (
          <div className="space-y-4 p-3 md:p-4 border border-amber-200 rounded-lg bg-amber-50">
            <div>
              <label htmlFor="customDescription" className="block text-amber-800 font-medium text-base mb-2">
                Custom Order Description
              </label>
              <textarea
                id="customDescription"
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                className="w-full p-2 md:p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-amber-900 text-base"
                placeholder="Describe your custom order"
                rows="3"
              />
            </div>

            <div>
              <label htmlFor="customQuantity" className="block text-amber-800 font-medium text-base mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setCustomQuantity(Math.max(1, customQuantity - 1))}
                  className="w-8 h-8 flex items-center justify-center border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors text-amber-700 font-medium"
                >
                  -
                </button>
                <span className="text-amber-900 font-medium text-base w-8 text-center">
                  {customQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => setCustomQuantity(customQuantity + 1)}
                  className="w-8 h-8 flex items-center justify-center border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors text-amber-700 font-medium"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-amber-800 font-medium text-base mb-2">
                Toppings
              </label>
              <div className="flex flex-wrap gap-2">
                {availableToppings.map((topping) => (
                  <button
                    key={topping}
                    type="button"
                    onClick={() => handleToppingToggle(topping)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      customToppings.includes(topping)
                        ? 'bg-amber-500 text-white'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                  >
                    {topping}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-amber-700 text-sm">
              Base price: $4.99 per item
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full p-3 md:p-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium text-base"
        >
          Create Order
        </button>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-4 sm:p-6 flex flex-col">
            <h3 className="text-xl font-bold text-amber-900 mb-4">Confirm Order</h3>
            
            <div className="flex flex-col flex-grow">
              {/* Scrollable content */}
              <div className="overflow-y-auto scrollbar-hide pr-2 mb-4" style={{ maxHeight: 'calc(70vh - 180px)' }}>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-amber-800 text-base mb-2">Customer</h4>
                    <p className="text-amber-700">{customerName}</p>
                  </div>

                  {selectedItems.length > 0 && (
                    <div>
                      <h4 className="font-medium text-amber-800 text-base mb-2">Menu Items</h4>
                      <div className="space-y-2">
                        {selectedItems.map((item) => (
                          <div key={item.name} className="flex justify-between items-center bg-amber-50 p-3 rounded-lg">
                            <div>
                              <span className="font-medium text-amber-900">{item.name}</span>
                              <span className="text-amber-600 text-sm ml-2">({item.size})</span>
                            </div>
                            <div className="text-right">
                              <span className="text-amber-700">{item.quantity} × ${getItemPrice(item).toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {showCustomForm && (
                    <div>
                      <h4 className="font-medium text-amber-800 text-base mb-2">Custom Order</h4>
                      <div className="bg-amber-50 p-3 rounded-lg space-y-2">
                        <p className="text-amber-700">{customDescription}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-amber-600">Quantity: {customQuantity}</span>
                          <span className="text-amber-700">${(4.99 * customQuantity).toFixed(2)}</span>
                        </div>
                        {customToppings.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {customToppings.map(topping => (
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
                    </div>
                  )}
                </div>
              </div>

              {/* Fixed bottom section */}
              <div className="border-t border-amber-200 pt-4 mt-auto">
                <div className="mb-4">
                  <h4 className="font-medium text-amber-800 text-base mb-2">Discount</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      max={calculateSubtotal()}
                      step="0.01"
                      value={discount}
                      onChange={handleDiscountChange}
                      className="w-24 p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-900"
                    />
                    <span className="text-amber-700">$</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-700">Subtotal</span>
                    <span className="text-amber-700">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount</span>
                      <span>-${parseFloat(discount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-t border-amber-200 pt-2">
                    <span className="font-medium text-amber-900 text-lg">Total</span>
                    <span className="font-bold text-amber-900 text-xl">${calculateTotal()}</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowConfirmation(false)}
                    className="px-4 py-2 border border-amber-200 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 