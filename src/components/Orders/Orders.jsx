import React, { useState } from 'react'
import { HiCheck, HiX } from 'react-icons/hi'

const mockOrders = [
    {
        _id: 'ORD-1001',
        userId: 'user1',
        customerName: 'Alicia Johnson',
        items: [
            { productId: 'p1', productName: 'Ergo Chair', quantity: 1, price: 249 },
            { productId: 'p2', productName: 'Standing Desk', quantity: 1, price: 399 }
        ],
        totalAmount: 648,
        status: 'Pending'
    },
    {
        _id: 'ORD-1002',
        userId: 'user2',
        customerName: 'Marcus Lee',
        items: [{ productId: 'p3', productName: 'Monitor Arm', quantity: 2, price: 89 }],
        totalAmount: 178,
        status: 'Approved'
    },
    {
        _id: 'ORD-1003',
        userId: 'user3',
        customerName: 'Sofia Patel',
        items: [
            { productId: 'p4', productName: 'Mechanical Keyboard', quantity: 1, price: 129 },
            { productId: 'p5', productName: 'Wireless Mouse', quantity: 1, price: 59 }
        ],
        totalAmount: 188,
        status: 'Rejected'
    },
    {
        _id: 'ORD-1004',
        userId: 'user4',
        customerName: 'Noah Kim',
        items: [{ productId: 'p6', productName: 'USB-C Hub', quantity: 3, price: 45 }],
        totalAmount: 135,
        status: 'Pending'
    }
]

const statusClasses = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Approved: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700'
}

const Orders = () => {
    const [orders, setOrders] = useState(mockOrders)

    const handleApprove = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) => (order._id === orderId ? { ...order, status: 'Approved' } : order))
        )
    }

    const handleReject = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) => (order._id === orderId ? { ...order, status: 'Rejected' } : order))
        )
    }

    return (
        <div className="min-h-screen bg-neutral-100 p-8">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-claret-800">Orders Management</h1>
                    <p className="mt-1 text-sm text-gray-600">Review recent purchases and update their status.</p>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-claret-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Order ID</th>
                            <th className="px-6 py-3 text-left">Customer</th>
                            <th className="px-6 py-3 text-left">Products</th>
                            <th className="px-6 py-3 text-left">Total Price</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-4 text-center">
                                    No orders available.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="border-b border-claret-200 hover:bg-claret-50">
                                    <td className="px-6 py-3">{order._id}</td>
                                    <td className="px-6 py-3">{order.customerName}</td>
                                    <td className="px-6 py-3">
                                        {order.items.map((item) => (
                                            <div key={item.productId}>
                                                {item.productName} (x{item.quantity})
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-3">${order.totalAmount}</td>
                                    <td className="px-6 py-3">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[order.status]}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        {order.status === 'Pending' && (
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    aria-label={`Approve order ${order._id}`}
                                                    className="rounded-full p-2 text-green-600 transition hover:bg-green-50 hover:text-green-700"
                                                    onClick={() => handleApprove(order._id)}
                                                >
                                                    <HiCheck size={18} />
                                                </button>
                                                <button
                                                    aria-label={`Reject order ${order._id}`}
                                                    className="rounded-full p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700"
                                                    onClick={() => handleReject(order._id)}
                                                >
                                                    <HiX size={18} />
                                                </button>
                                            </div>
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
