import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './components/Dashboard'
import ProductsControl from './components/ProductsControl'
import Customers from './components/Customers/Customers'
import Orders from './components/Orders/Orders'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<ProductsControl />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Route>
                <Route path="login" element={<div className="">this is Login page</div>} />
            </Routes>
        </Router>
    )
}

export default App
