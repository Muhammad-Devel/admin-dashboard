import React from 'react'
import DashboardStatsGrid from './DashboardStatsGrid'
import TransactionsChart from './TransactionsChart'
import BuyerProfilePieChart from './BuyerProfilePieChart'
import RecentOrders from './RecentOrders'
import PopularProducts from './PopularProducts'

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4 p-4">
            <DashboardStatsGrid />
            <div className="flex flex-row gap-4 w-full">
                <TransactionsChart />
                <BuyerProfilePieChart />
            </div>
            <div className="flex flex-row gap-4 w-full">
                <RecentOrders />
                <PopularProducts />
            </div>
        </div>
    )
}
