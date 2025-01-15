import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './components/Dashboard'
import ProductsControl from './components/ProductsControl'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<ProductsControl />} />
                </Route>
                <Route path="login" element={<div className="">this is Login page</div>} />
            </Routes>
        </Router>
    )
}

export default App
