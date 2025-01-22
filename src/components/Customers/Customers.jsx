import React, { useState, useEffect } from 'react'
import { HiOutlineTrash, HiOutlinePencilAlt, HiPlus, HiOutlineCheck, HiOutlineX } from 'react-icons/hi'
import { allCustomers, deleteCustomer, updateCustomer, createCustomer } from '../../api/customers'
import AddCustomer from '../actions/AddCustomer'

const Customers = () => {
    const [customersList, setCustomersList] = useState([])
    const [showAddCustomerForm, setShowAddCustomerForm] = useState(false) // Add formni ko'rsatish uchun
    const [editedCustomer, setEditedCustomer] = useState(null) // Tahrirlanayotgan customer
    const [editCustomerId, setEditCustomerId] = useState(null) // Tahrirlanayotgan customer ID si
    const [error, setError] = useState(null)
    const [customerAdded, setCustomerAdded] = useState(false) // Muvaffaqiyatli qo'shilganligini kuzatish

    useEffect(() => {
        // Komponent yuklanganida customers ma'lumotlarini yuklash
        const fetchCustomers = async () => {
            const customers = await allCustomers()
            if (Array.isArray(customers)) {
                setCustomersList(customers)
            } else {
                setCustomersList([]) // Agar ma'lumot kelmasa bo'sh array
            }
        }
        fetchCustomers()

        if (customerAdded) {
            setCustomerAdded(false)
        }
    }, [customerAdded])

    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id)
            const updatedCustomers = customersList.filter((customer) => customer.id !== id)
            setCustomersList(updatedCustomers)
        } catch (error) {
            console.error('Failed to delete customer:', error)
        }
    }

    const handleEdit = (customer, index) => {
        setEditCustomerId(index)
        setEditedCustomer(customer)
    }

    const handleCancelEdit = () => {
        setEditCustomerId(null)
        setEditedCustomer(null)
    }

    const handleSaveEdit = async () => {
        if (!editedCustomer.name || !editedCustomer.email || !editedCustomer.phone) {
            setError("Iltimos, barcha maydonlarni to'ldiring.")
            return
        }

        try {
            await updateCustomer(editCustomerId, editedCustomer)
            const updatedCustomersList = customersList.map((customer) =>
                customer.id === editCustomerId ? editedCustomer : customer
            )
            setCustomersList(updatedCustomersList)
            setEditCustomerId(null)
            setError(null)
        } catch (error) {
            console.error('Failed to update customer:', error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditedCustomer({
            ...editedCustomer,
            [name]: value
        })
    }

    const handleAddCustomer = async (newCustomer) => {
        if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
            setError("Iltimos, barcha maydonlarni to'ldiring.")
            return
        }

        try {
            await createCustomer(newCustomer)
            setCustomerAdded(true) // Muvaffaqiyatli qo'shilganini kuzatish
        } catch (error) {
            console.error('Failed to add customer:', error)
        }
    }

    return (
        <div className="p-8 bg-neutral-100 min-h-screen">
            <h1 className="text-2xl font-bold text-claret-800 mb-6">Customers Control</h1>

            <div className="flex justify-between items-center mb-4">
                <button
                    className="bg-claret-500 text-white py-2 px-4 rounded-md hover:bg-claret-700 flex items-center"
                    onClick={() => setShowAddCustomerForm(!showAddCustomerForm)}
                >
                    <HiPlus className="mr-2" /> Add Customer
                </button>
            </div>

            {/* Add Customer Form */}
            {showAddCustomerForm && <AddCustomer handleAddCustomer={handleAddCustomer} />}

            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full text-sm bg-white">
                    <thead className="bg-claret-500 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Phone</th>
                            <th className="py-3 px-6 text-left">Number of Orders</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersList.length === 0 &&
                            (error ? (
                                <tr>
                                    <td colSpan="4" className="text-center text-red-500">
                                        {error}
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-lg text-claret-800">
                                        No customers available
                                    </td>
                                </tr>
                            ))}

                        {customersList.map((customer, index) => (
                            <tr key={index} className="border-b border-claret-200 hover:bg-claret-50">
                                {editCustomerId === index ? (
                                    <>
                                        <td className="py-3 px-6">
                                            <input
                                                type="text"
                                                name="name"
                                                value={editedCustomer.name}
                                                onChange={handleChange}
                                                className="w-full p-1 border border-claret-300 rounded-md"
                                            />
                                        </td>
                                        <td className="py-3 px-6">
                                            <input
                                                type="email"
                                                name="email"
                                                value={editedCustomer.email}
                                                onChange={handleChange}
                                                className="w-full p-1 border border-claret-300 rounded-md"
                                            />
                                        </td>
                                        <td className="py-3 px-6">
                                            <input
                                                type="text"
                                                name="phone"
                                                value={editedCustomer.phone}
                                                onChange={handleChange}
                                                className="w-full p-1 border border-claret-300 rounded-md"
                                            />
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
                                        <td className="py-3 px-6">{customer.name}</td>
                                        <td className="py-3 px-6">{customer.email}</td>
                                        <td className="py-3 px-6">{customer.phone}</td>
                                        <td className="py-3 px-6">{customer.byOrders``}</td>
                                        <td className="py-3 px-6 text-right flex justify-end gap-4">
                                            <button
                                                onClick={() => handleEdit(customer, index)}
                                                className="text-claret-500 hover:text-claret-700"
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

export default Customers
