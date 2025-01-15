import React from 'react'
import { FcBullish } from 'react-icons/fc'
import { Link, useLocation } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/navigation'
import classNames from 'classnames'
import { HiOutlineLogout } from 'react-icons/hi'

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-claret-400 hover:no-underline active:bg-claret-500 rounded-sm text-base'

export const Sidebar = () => {
    return (
        <div className="bg-claret-500 w-60 p-3 flex flex-col  text-white">
            <div className="flex items-center gap-2 px-1 py-3">
                <FcBullish fontSize={24} />
                <span className="text-claret-900 text-lg">Admin's Order</span>
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLinks key={item.key} item={item} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-claret-900">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SidebarLinks key={item.key} item={item} />
                ))}
                <div className={classNames('text-claret-100 cursor-pointer', linkClass)}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    )
}

function SidebarLinks({ item }) {
    const { pathname } = useLocation()
    return (
        <Link
            to={item.path}
            className={classNames(pathname === item.path ? 'bg-claret-400 text-white' : 'text-claret-900', linkClass)}
        >
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}
