import axios from 'axios'
import { apiEndpoints } from '../config'

const API_URL = apiEndpoints.products // Use HTTP unless SSL is configured

// Create a new product
const createProduct = async (productData) => {
    try {
        console.log('productData:', productData)

        const response = await axios.post(`${API_URL}/add`, {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            quantity: productData.quantity,
            status: productData.status
        })

        console.log('response:', response.data) // Handle success response
        return response.data // Return response data
    } catch (error) {
        // Handle error and log additional error information
        if (error.response) {
            console.log('Error Response:', error.response.data)
            return error.response.data
        } else if (error.request) {
            console.log('No Response Received:', error.request)
            return error.request
        } else {
            console.log('Error:', error.message)
            return error.message
        }
    }
}
// Get all products
const allProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`)
        return response.data
    } catch (error) {
        if (error.response.status === 404) {
            console.log('Error:', error.response.data.message)
            return []
        }
        console.log('Error:', error.message)
    }
}

//delete product by id in the database
const deleteProduct = async (product) => {
    console.log('products:', product)
    const productId = product._id

    try {
        const response = await axios.delete(`${API_URL}/delete/${productId}`)
        return response.data
    } catch (error) {
        console.log('Error:', error.message)
        return error.message
    }
}
// Update a product
const updateProduct = async (productData) => {
    try {
        console.log('productData:', productData)

        const response = await axios.patch(`${API_URL}/update/${productData._id}`, {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            quantity: productData.quantity,
            status: productData.status
        })
        return response.data // Return response data
    } catch (error) {
        // Handle error and log additional error information
        if (error.response) {
            console.log('Error Response:', error.response.data)
            return error.response.data
        } else if (error.request) {
            console.log('No Response Received:', error.request)
            return error.request
        } else {
            console.log('Error:', error.message)
            return error.message
        }
    }
}
// Export the functions
export { createProduct, allProducts, deleteProduct, updateProduct }
