import axios from 'axios'
import { apiEndpoints } from '../config'
const API_URL = apiEndpoints.orders

// Get all orders
export const getOrders = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data.data
    } catch (error) {
        console.error('Error fetching orders:', error)
        throw error
    }
}

// Get a single order by ID
export const getOrderById = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/${orderId}`)
        return response.data
    } catch (error) {
        console.error(`Error fetching order with ID ${orderId}:`, error)
        throw error
    }
}

// Create a new order
export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(API_URL, orderData)
        return response.data
    } catch (error) {
        console.error('Error creating order:', error)
        throw error
    }
}

// Update an existing order
export const updateOrder = async (orderId, orderData) => {
    try {
        const response = await axios.put(`${API_URL}/${orderId}`, orderData)
        return response.data
    } catch (error) {
        console.error(`Error updating order with ID ${orderId}:`, error)
        throw error
    }
}

// Delete an order
export const deleteOrder = async (orderId) => {
    try {
        const response = await axios.delete(`${API_URL}/${orderId}`)
        return response.data
    } catch (error) {
        console.error(`Error deleting order with ID ${orderId}:`, error)
        throw error
    }
}
