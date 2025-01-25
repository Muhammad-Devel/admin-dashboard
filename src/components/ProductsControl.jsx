import React, { useState, useEffect } from 'react'
import {
    HiOutlineTrash,
    HiOutlinePencilAlt,
    HiPlus,
    HiOutlineCheck,
    HiOutlineX,
    HiOutlineXCircle
} from 'react-icons/hi'
import { createProduct, allProducts, deleteProduct, updateProduct } from '../services/product'
import AddProduct from './actions/AddProduct'

const ProductsControl = () => {
    const [productList, setProductList] = useState([])
    const [showAddProductForm, setShowAddProductForm] = useState(false) // Toggle add product form visibility
    const [editedProduct, setEditedProduct] = useState(null) // To track product being edited
    const [editProductId, setEditProductId] = useState(null) // To track editing product ID
    const [error, setError] = useState(null)
    const [productAdded, setProductAdded] = useState(false) // Track if a product was successfully added

    useEffect(() => {
        // Load products on component mount (initial render)
        const fetchProducts = async () => {
            try {
                const products = await allProducts()
                console.log('products:', products)
                setProductList(products)
            } catch (error) {
                console.error('Failed to fetch products:', error)
                setError('Failed to fetch products.')
            }
        }
        fetchProducts()
    }, [productAdded]) // Refetch products when productAdded changes

    const handleDelete = (index) => {
        const updatedProducts = productList.filter((product, i) => i !== index)
        const deleteMsg = deleteProduct(productList[index])
        console.log('deleteMsg:', deleteMsg)

        setProductList(updatedProducts)
    }

    const handleEdit = (product, index) => {
        setEditProductId(index) // Set the ID of the product being edited
        setEditedProduct(product) // Load the product data into edit state
    }

    const handleCancelEdit = () => {
        setEditProductId(null) // Cancel editing
        setEditedProduct(null) // Clear edited product
    }

    const handleSaveEdit = () => {
        // Simple validation before saving
        if (!editedProduct.name || !editedProduct.price || !editedProduct.quantity) {
            setError('Please fill all fields before saving.')
            return
        }

        const success = updateProduct(editedProduct)
        if (!success) {
            setError('Failed to update product. Please try again.')
            return
        }
        // Update product in the productList
        const updatedProductList = productList.map((product, index) =>
            index === editProductId ? editedProduct : product
        )
        setProductList(updatedProductList)
        setEditProductId(null) // End editing mode
        setError(null) // Clear any error message
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditedProduct({
            ...editedProduct,
            [name]: value
        })
    }

    const handleAddProduct = (newProduct) => {
        // create new product
        if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.quantity) {
            setError('Please fill all fields')
            return
        }
        setError(null)
        const success = createProduct(newProduct)
        if (success) {
            setProductAdded(true) // Set success flag to true
        }
    }

    return (
        <div className="p-8 bg-neutral-100 min-h-screen">
            <h1 className="text-2xl font-bold text-claret-800 mb-6">Products Control</h1>

            <div className="flex justify-between items-center mb-4">
                <button
                    className="bg-claret-500 text-white py-2 px-4 rounded-md hover:bg-claret-700 flex items-center"
                    onClick={() => setShowAddProductForm(!showAddProductForm)}
                >
                    <HiPlus className="mr-2" /> Add Product
                </button>
            </div>

            {/* Add Product Form */}
            {showAddProductForm && (
                <div
                    className="transform transition-transform duration-300 ease-in-out"
                    style={{ height: showAddProductForm ? 'auto' : '0', opacity: showAddProductForm ? '1' : '0' }}
                >
                    <AddProduct handleAddProduct={handleAddProduct} isVisible={setShowAddProductForm} />
                </div>
            )}

            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full text-sm bg-white">
                    <thead className="bg-claret-500 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Product Name</th>
                            <th className="py-3 px-6 text-left">Price</th>
                            <th className="py-3 px-6 text-left">Quantity</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Show error or empty product list message */}
                        {productList.length === 0 &&
                            (error ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-red-500">
                                        {error}
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-lg text-claret-800">
                                        No products available <HiOutlineXCircle className="inline-block" size={28} />
                                    </td>
                                </tr>
                            ))}
                        {/* Product list */}
                        {productList.length !== 0 &&
                            productList.map((product, index) => (
                                <tr key={index} className="border-b border-claret-200 hover:bg-claret-50">
                                    {console.log('productID:', index)}
                                    {editProductId === index ? (
                                        <>
                                            <td className="py-3 px-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={editedProduct.name}
                                                    onChange={handleChange}
                                                    className="w-full p-1 border border-claret-300 rounded-md"
                                                />
                                            </td>
                                            <td className="py-3 px-6">
                                                <textarea
                                                    rows={4}
                                                    cols={40}
                                                    name="name"
                                                    value={editedProduct.description}
                                                    onChange={handleChange}
                                                    className="w-full p-1 border border-claret-300 rounded-md"
                                                />
                                            </td>
                                            <td className="py-3 px-6">
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={editedProduct.price}
                                                    onChange={handleChange}
                                                    className="w-full p-1 border border-claret-300 rounded-md"
                                                />
                                            </td>
                                            <td className="py-3 px-6">
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    value={editedProduct.quantity}
                                                    onChange={handleChange}
                                                    className="w-full p-1 border border-claret-300 rounded-md"
                                                />
                                            </td>
                                            <td className="py-3 px-6">
                                                <select
                                                    name="status"
                                                    value={editedProduct.status}
                                                    onChange={handleChange}
                                                    className="w-full p-1 border border-claret-300 rounded-md"
                                                >
                                                    <option value="true">Available</option>
                                                    <option value="false">Out of Stock</option>
                                                </select>
                                            </td>
                                            <td className="py-3 px-6 text-right flex justify-end gap-4">
                                                <button
                                                    onClick={handleSaveEdit}
                                                    className="text-green-500 hover:text-green-700"
                                                >
                                                    <HiOutlineCheck size={20} />
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <HiOutlineX size={20} />
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="py-3 px-6 text-claret-800">{product.name}</td>
                                            <td className="py-3 px-6 text-claret-800">${product.price}</td>
                                            <td className="py-3 px-6 text-claret-800">{product.quantity}</td>
                                            <td
                                                className={`py-3 px-6 ${
                                                    product.status === 'true' ? 'text-green-600' : 'text-red-600'
                                                }`}
                                            >
                                                {product.status === 'true' ? 'Available' : 'Out of Stock'}
                                            </td>
                                            <td className="py-3 px-6 text-right flex justify-end gap-4">
                                                <button
                                                    className="text-claret-500 hover:text-claret-700"
                                                    onClick={() => handleEdit(product, index)}
                                                >
                                                    <HiOutlinePencilAlt size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <HiOutlineTrash size={20} />
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductsControl
