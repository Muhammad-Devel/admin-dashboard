import React, { useState, useEffect } from 'react'
import { HiCheck, HiX } from 'react-icons/hi'
import axios from 'axios'
import { getOrders } from '../../services/ordersApi'
import { fetchCustomerById } from '../../services/customers'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState(null)
    const [customerName, setCustomerName] = useState('')

    useEffect(() => {
        // Bu yerda buyurtmalarni API orqali olish kerak
        async function getAllOrders() {
            const fetchOrders = await getOrders()
            console.log(fetchOrders)

            if (fetchOrders) {
                setOrders(fetchOrders.orders)
                console.log(fetchOrders.orders)
                const customerNames = {}
                for (const order of fetchOrders.orders) {
                    const customerData = await fetchCustomerById(order.userId)
                    customerNames[order.userId] = customerData.name
                }
                setCustomerName(customerNames)
            } else {
                setOrders([]) // Agar ma'lumot kelmasa bo'sh array
            }
        }
        getAllOrders()
    }, [])

    // get the customer name from the database

    const handleApprove = async (orderId) => {
        // Buyurtmani tasdiqlash logikasi
        try {
            await axios.post(`http://localhost:5000/api/orders/${orderId}/approve`)
            setOrders(orders.map((order) => (order._id === orderId ? { ...order, status: 'Approved' } : order)))
        } catch (err) {
            setError('Buyurtmani tasdiqlashda xatolik.')
        }
    }

    const handleReject = async (orderId) => {
        // Buyurtmani rad etish logikasi
        try {
            await axios.post(`http://localhost:5000/api/orders/${orderId}/reject`)
            setOrders(orders.map((order) => (order._id === orderId ? { ...order, status: 'Rejected' } : order)))
        } catch (err) {
            setError('Buyurtmani rad etishda xatolik.')
        }
    }

    return (
        <div className="p-8 bg-neutral-100 min-h-screen">
            <h1 className="text-2xl font-bold text-claret-800 mb-6">Orders Management</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full text-sm bg-white">
                    <thead className="bg-claret-500 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Order ID</th>
                            <th className="py-3 px-6 text-left">Customer</th>
                            <th className="py-3 px-6 text-left">Products</th>
                            <th className="py-3 px-6 text-left">Total Price</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    Buyurtmalar mavjud emas
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="border-b border-claret-200 hover:bg-claret-50">
                                    <td className="py-3 px-6">{order._id}</td>
                                    <td className="py-3 px-6">{customerName[order.userId] || 'Loading...'}</td>
                                    <td className="py-3 px-6">
                                        {order.items.map((item) => (
                                            <div key={item.productId}>
                                                {item.productName} (x{item.quantity})
                                            </div>
                                        ))}
                                    </td>
                                    <td className="py-3 px-6">${order.totalAmount}</td>
                                    <td className="py-3 px-6">
                                        <span
                                            className={
                                                order.orderStatus === 'Pending'
                                                    ? 'text-yellow-500'
                                                    : order.orderStatus === 'Approved'
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                            }
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-right flex justify-end gap-4">
                                        {order.orderStatus === 'Pending' && (
                                            <>
                                                <button
                                                    className="text-green-500 hover:text-green-700"
                                                    onClick={() => handleApprove(order._id)}
                                                >
                                                    <HiCheck size={20} />
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleReject(order._id)}
                                                >
                                                    <HiX size={20} />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders
