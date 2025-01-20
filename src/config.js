const config = {
    api: {
        baseUrl: 'http://localhost:5000',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_API_KEY'
        }
    }
}

export default config
const apiEndpoints = {
    orders: `${config.api.baseUrl}/orders`,
    products: `${config.api.baseUrl}/api/product`,
    customers: `${config.api.baseUrl}/auth`,
    messages: `${config.api.baseUrl}/messages`,
    exports: `${config.api.baseUrl}/exports`
}

export { apiEndpoints }
