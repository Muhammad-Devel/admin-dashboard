import React from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

const cakeOrders = [
    { cake: 'Vanilla Cake', orders: 120, revenue: 1500 },
    { cake: 'Chocolate Cake', orders: 200, revenue: 2500 },
    { cake: 'Strawberry Cake', orders: 150, revenue: 1800 },
    { cake: 'Red Velvet Cake', orders: 100, revenue: 1300 },
    { cake: 'Lemon Cake', orders: 90, revenue: 1100 },
    { cake: 'Carrot Cake', orders: 80, revenue: 1000 },
    { cake: 'Cheese Cake', orders: 130, revenue: 1600 },
    { cake: 'Coffee Cake', orders: 110, revenue: 1400 },
    { cake: 'Black Forest Cake', orders: 70, revenue: 900 },
    { cake: 'Banana Cake', orders: 60, revenue: 750 }
]

export default function TransactionsChart() {
    return (
        <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Transactions</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                        width={500}
                        height={300}
                        data={cakeOrders}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="cake" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="orders" fill="#3e0515" />
                        <Bar dataKey="revenue" fill="#da134b" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
