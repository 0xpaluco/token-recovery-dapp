import {Account, Chains} from '@components/Web3';
import { DarkModeToggler } from '@components/index'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { classNames } from '@helpers/ui';
import { navigation, userNavigation } from '@helpers/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';


interface Props {
  className?: string;
  themeMode: string;
  themeToggler: Function;
};

export default function Topbar({ themeMode, themeToggler, className, ...rest }: Props) {
  const router = useRouter()
  return (
    <div className="min-h-full">
    <div className="dark:bg-c-d-primary bg-c-d-secondary pb-32">
      
      {/*  Topbar Nav */}
      <Disclosure as="nav" className=" dark:bg-c-d-primary bg-c-d-secondary border-b border-indigo-300 border-opacity-25 lg:border-none">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                <div className="px-2 flex items-center lg:px-0">
                  <div className="flex-shrink-0">
                  <Link href={"/"}>
                    <img
                      className="block h-8 w-8 cursor-pointer"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                      alt="Workflow"
                    />
                    </Link>
                  </div>
                  <div className="hidden lg:block lg:ml-10">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link href={item.href}>
                        <a key={item.name} className={classNames(
                            item.current(router.asPath)
                              ? 'bg-indigo-700 text-white'
                              : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                            'rounded-md py-2 px-3 text-sm font-medium'
                          )}
                          aria-current={item.current(router.asPath) ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={classNames(true ? "hidden" : "", "flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end")}>
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative text-gray-400 focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        id="search"
                        className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm"
                        placeholder="Search"
                        type="search"
                        name="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="dark:bg-c-primary p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:block lg:ml-4">
                  <div className="flex items-center">
                    {/* Profile dropdown */}
                    <DarkModeToggler themeMode={themeMode} onClick={() => themeToggler()}/>
                    <Account mobile={false}/>
                    
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Mobile */}
            <Disclosure.Panel className="lg:hidden">
              
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="div"
                  >
                    <Link href={item.href}>
                      <a key={item.name} className={classNames(
                          item.current(router.asPath)
                            ? 'bg-indigo-700 text-white'
                            : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                          'block rounded-md py-2 px-3 text-base font-medium'
                        )}
                        aria-current={item.current(router.asPath) ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  </Disclosure.Button>
                ))}
              </div>

              {/* Account for Mobile*/}
              <div className="pt-4 pb-3 border-t border-indigo-700">
                <Account mobile={true}/>
              </div>

            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      
    </div>
    </div>
  )
}


