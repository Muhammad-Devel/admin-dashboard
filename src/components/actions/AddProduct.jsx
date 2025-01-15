import React, { useState } from 'react'

const AddProduct = ({ handleAddProduct, isVisible }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        status: 'true' // Default holat
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setProduct({
            ...product,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Mahsulot qo'shish logikasi
        handleAddProduct(product) // Foydalanuvchi tomonidan kiritilgan mahsulotni qo'shish
        setProduct({ name: '', description: '', price: '', quantity: '', status: 'Available' }) // Formani tozalash
        isVisible(false) // Formani yopish
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold text-claret-900 mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label className="block text-claret-700 mb-1">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-claret-300 rounded-lg"
                        placeholder="Enter product name"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-claret-700 mb-1">Description</label>
                    <textarea
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-claret-300 rounded-lg"
                        placeholder="Enter product price"
                        rows={3}
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-claret-700 mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full p-2 border border-claret-300 rounded-lg"
                        placeholder="Enter product price"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-claret-700 mb-1">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        className="w-full p-2 border border-claret-300 rounded-lg"
                        placeholder="Enter product quantity"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-claret-700 mb-1">Status</label>
                    <select
                        name="status"
                        value={product.status}
                        onChange={handleChange}
                        className="w-full p-2 border border-claret-300 rounded-lg"
                    >
                        <option value="true">Available</option>
                        <option value="false">Out of Stock</option>
                    </select>
                </div>
                <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-claret-500 text-white py-2 px-4 rounded-md hover:bg-claret-700">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct
