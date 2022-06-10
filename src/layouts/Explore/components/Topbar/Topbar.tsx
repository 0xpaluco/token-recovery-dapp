import { DarkModeToggler } from '@components/index'
import { Fragment, SVGProps, useState } from 'react'
import { Dialog, Menu, Popover, Transition } from '@headlessui/react'
import { MenuAlt2Icon, PlusSmIcon, SearchIcon, LoginIcon} from '@heroicons/react/solid'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { classNames } from '@helpers/ui'
import { navigation, userNavigation } from '@helpers/routes'
import Link from 'next/link'
import { useMoralis } from 'react-moralis'

interface Props {
  className?: string;
  themeMode: string;
  themeToggler: Function;
};

const SignOutButton = () => {
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  if (isAuthenticated) {
    return (
      <button
        onClick={logOut}
        className="block rounded-md py-2 px-3 text-sm hover:bg-gray-50 hover:text-red-700" >
            Logout
      </button>
    )
  }

  return null;
}

const ProfileAvatar = () => {

  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
        <button type="button"
          onClick={login}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
           <LoginIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" /><span className="mx-2">Login</span>
        </button>
      </div>
      
    )
  }

  return (
    <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
      {/* Profile dropdown */}
      <Menu as="div" className="relative flex-shrink-0">
        <div>
          <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src={""} alt="" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {userNavigation.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link  href={item.href}>
                    <a className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {item.name}
                    </a>
                  </Link>
                )}
              </Menu.Item>
            ))}
            <Menu.Item key={'logout'}>
                <SignOutButton/>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>

      <Link href={'/me/new-entry'}>
        <button
          type="button"
          className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">New Journal Entry</span>
        </button>
      </Link>
      
      
    </div>
  )
}

export default function Topbar({ themeMode, themeToggler, className, ...rest }: Props) {

  return (
    <>

      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
       
        <div className="relative z-10 flex-shrink-0 h-16 border-b border-gray-200 shadow-sm flex">
        <div className="hidden md:flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" >
                <a >
                  <img className="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="Workflow" />
                </a>
                
              </Link>
            </div>
          </div>
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          >
            <span className="sr-only">logo</span>
            <MenuAlt2Icon className="h-6 w-6 invisible" aria-hidden="true" />
          </button>
          <div className="flex-1 flex justify-between sm:px-6 bg-white">
            
            {/** Search Button */}
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Journal
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center mx-2">
                    <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    name="search-field"
                    id="search-field"
                    className="bg-white mx-4 h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </form>
            </div>
            

            <ProfileAvatar/>

          </div>
        </div>
      </header>
    </>
  )
}


