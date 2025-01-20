import axios from 'axios'
import { apiEndpoints } from '../config'

const API_URL = apiEndpoints.customers

// Fetch all customers
const allCustomers = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.error('Error fetching customers:', error)
        throw error
    }
}

// Fetch a single customer by ID
const fetchCustomerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`)
        return response.data
    } catch (error) {
        console.error(`Error fetching customer with ID ${id}:`, error)
        throw error
    }
}

// Create a new customer
const createCustomer = async (customerData) => {
    try {
        const response = await axios.post(API_URL, customerData)
        return response.data
    } catch (error) {
        console.error('Error creating customer:', error)
        throw error
    }
}

// Update an existing customer
const updateCustomer = async (id, customerData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, customerData)
        return response.data
    } catch (error) {
        console.error(`Error updating customer with ID ${id}:`, error)
        throw error
    }
}

// Delete a customer
const deleteCustomer = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        return response.data
    } catch (error) {
        console.error(`Error deleting customer with ID ${id}:`, error)
        throw error
    }
}

export { allCustomers, fetchCustomerById, deleteCustomer, updateCustomer, createCustomer }
