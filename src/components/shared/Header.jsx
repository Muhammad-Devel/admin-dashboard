import React from 'react'
import { Popover, PopoverButton, PopoverPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineLogout, HiOutlineSearch, HiOutlineUserCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'

export default function Header() {
    const navigate = useNavigate()
    return (
        <div className="bg-white h-16 px-4 flex justify-between items-center border border-gray-200">
            <div className="relative">
                <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4"
                />
            </div>
            <div className="flex items-center gap-2 mr-2 text-claret-600">
                {/* Chat and PushOn buttons */}
                <Popover className="relative">
                    <PopoverButton className="block text-sm/6 font-semibold text-claret/50 focus:outline-none data-[active]:text-claret-600 data-[hover]:text-claret data-[focus]:outline-1 data-[focus]:outline-claret">
                        <HiOutlineChatAlt fontSize={24} />
                    </PopoverButton>
                    <PopoverPanel
                        transition
                        anchor="bottom end"
                        className="w-64 divide-y divide-claret/5 rounded-xl bg-claret/15 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                    >
                        <div className="p-3">
                            <strong className="text-claret-300 font-medium">Xabarlar</strong>
                            <div className="mt-2 py-1 text-sm">Bu xabarlar paneli.</div>
                        </div>
                    </PopoverPanel>
                </Popover>
                <Popover className="relative">
                    <PopoverButton className="block text-sm/6 font-semibold text-claret/50 focus:outline-none data-[active]:text-claret data-[hover]:text-claret data-[focus]:outline-1 data-[focus]:outline-claret">
                        <HiOutlineBell fontSize={24} />
                    </PopoverButton>
                    <PopoverPanel
                        transition
                        anchor="bottom end"
                        className="w-64 divide-y divide-claret/5 rounded-xl bg-claret/15 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                    >
                        <div className="p-3">
                            <strong className="text-claret-300 font-medium">Bildirishnomalar</strong>
                            <div className="mt-2 py-1 text-sm">Bu bildirishnomalar paneli</div>
                        </div>
                    </PopoverPanel>
                </Popover>
                {/* User Profile Dropdown Menu */}
                <Menu>
                    <MenuButton className="inline-flex items-center gap-2 rounded-md bg-transparent py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-transparent data-[open]:bg-transparent data-[focus]:outline-1 data-[focus]:outline-white">
                        <div
                            className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                            style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
                        >
                            <span className="sr-only">Admin aka</span>
                        </div>
                    </MenuButton>

                    <MenuItems
                        transition
                        anchor="bottom end"
                        className="w-52 origin-top-right rounded-xl border border-white/5 bg-claret/15 p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/30">
                                <HiOutlineUserCircle fontSize={24} />
                                <button
                                    onClick={() => {
                                        navigate('/profile')
                                    }}
                                >
                                    Profile
                                </button>
                                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                    ⌘P
                                </kbd>
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/30">
                                <HiOutlineCog6Tooth fontSize={24} />
                                <button
                                    onClick={() => {
                                        navigate('/settings')
                                    }}
                                >
                                    Sozlamalar
                                </button>
                                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                    ⌘S
                                </kbd>
                            </button>
                        </MenuItem>
                        <div className="my-1 h-px bg-white/5" />
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/30">
                                <HiOutlineLogout fontSize={24} />
                                <button>Chiqish</button>
                                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                    ⌘Ch
                                </kbd>
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    )
}
