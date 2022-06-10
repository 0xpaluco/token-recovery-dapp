import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, LoginIcon } from '@heroicons/react/outline'
import { useEnsAddress, useMoralis } from "react-moralis";

import styles from "@styles/Shared.module.css";

import { getEllipsisTxt } from '@helpers/formater';
import { userNavigation } from '@helpers/routes';
import { classNames } from '@helpers/ui';
import { Blockie, WalletModal} from '@components/index';
import Link from 'next/link';



interface AccountProps {
  mobile: boolean;
  trim?: number
}


const Account = (props: AccountProps) => {
    const { authenticate, isAuthenticated, logout, chainId, user} = useMoralis();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const account = user?.get('ethAddress') || "noacc";
    const { name, isLoading, error} = useEnsAddress(account)


   
    if (!isAuthenticated || !user) {
        return (
            <div className="px-5 flex items-center">
                <div  
                    className={classNames(styles.mainActionBtn, 'dark:bg-c-primary dark:hover:bg-c-l-primary dark:text-white dark:hover:text-black')} 
                    onClick={() => setIsModalVisible(true)} >
                        
                        <p>Login</p>
                </div>
                <WalletModal open={isModalVisible} setOpen={() => setIsModalVisible(false)} authenticate={authenticate} />
            </div>

        );
    }

    if(props.mobile) {
      return(
      <div>
        <div className="px-5 flex items-center">
          <span className="sr-only">Open user menu</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-s font-medium dark:bg-c-primary dark:text-white bg-c-secondary text-white">
            <Blockie address={account} currentWallet={isAuthenticated} className='mr-2' />
            {name ? name : getEllipsisTxt(account, props.trim)}
          </span>
          <button type="button"  className="ml-8 dark:bg-c-primary dark:hover:bg-c-l-primary dark:text-white dark:hover:text-black p-1 rounded-full bg-c-secondary text-c-l-secondary hover:text-gray-500 hover:bg-c-l-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 px-2 space-y-1">
          {userNavigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="div"
              className="block rounded-md py-2 px-0 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
            >
              <Link href={item.href}>
                <a key={item.name} className={classNames(
                    'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                    'rounded-md py-2 text-base px-3 font-medium'
                  )}
                >
                  {item.name}
                </a>
              </Link>
            </Disclosure.Button>
          ))}
          <Disclosure.Button
              key={'Sign Out'}
              onClick={logout}
              as="button"
              className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
            >
              Logout
            </Disclosure.Button>
        </div>
      </div>
      );
    };
      

    return (
        <div className="ml-4 flex items-center md:ml-6">
            <button type="button"  className="dark:bg-c-primary dark:hover:bg-c-l-primary dark:text-white dark:hover:text-black p-1 rounded-full bg-c-secondary text-c-l-secondary hover:text-gray-500 hover:bg-c-l-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative z-10">
                <div>
                    <Menu.Button className="max-w-xs flex items-center text-s rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-s font-medium dark:bg-c-primary dark:text-white bg-c-secondary text-white">
                        <Blockie address={account} currentWallet={isAuthenticated} className='mr-2' />
                        {name ? name : getEllipsisTxt(account, props.trim)}
                      </span>
                      
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                      {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link href={item.href}>
                              <a className={classNames( active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700' )} >
                                {item.name} 
                              </a>
                            </Link>
                          )}
                          </Menu.Item>
                      ))}
                      <button key={'logout'} onClick={logout}>
                        <span className={classNames('block py-2 px-4 text-sm text-gray-700' )} >
                          Logout
                        </span>
                      </button>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
    
}

export default Account;