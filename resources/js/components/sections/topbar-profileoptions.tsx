import { Combobox, ComboboxButton, ComboboxOption, ComboboxOptions, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "@inertiajs/react";

export default function TopBarProfileOptions() {
    return (
        <>
                <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="h-full cursor-pointer rounded-4xl bg-white text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                        <div className="bg-brand-white rounded-4xl overflow-hidden h-full">
                            <img src="/build/images/Profile_DefaultAvatar.png" className="object-fit h-full" />
                        </div>
                    </MenuButton>
                    <MenuItems transition className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                        <div className="py-1">
                            <MenuItem>
                                <Link href="" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                                    Editar Perfil
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                                    Cerrar Sesión
                                </Link>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
        </>
    )
}