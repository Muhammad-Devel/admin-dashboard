import axios from 'axios'

const API_URL = 'http://localhost:5000/api/product' // Use HTTP unless SSL is configured

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

const allProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`)
        return response.data
    } catch (error) {
        console.log('Error:', error.message)
        return error.message
    }
}

export { createProduct, allProducts }
