import { useEffect, useState, Fragment, MouseEvent } from "react";
import { Menu, Transition } from '@headlessui/react'
import { AvaxLogo, ETHLogo, LocalLogo } from "./Logos";
import { useChain, useMoralis } from "react-moralis";
import styles from "@styles/Shared.module.css";
import { classNames } from "@helpers/ui";


interface MenuItem {
    key: string;
    value: string;
    icon: JSX.Element;
}

const menuItems: MenuItem[] = [
    {
      key: "0x1",
      value: "Ethereum",
      icon: <ETHLogo />,
    },
    {
      key: "0x3",
      value: "Ropsten Testnet",
      icon: <ETHLogo />,
    },
    {
      key: "0xa86a",
      value: "Avalanche",
      icon: <AvaxLogo />,
    },
    {
      key: "0xa869",
      value: "Avalanche Testnet",
      icon: <AvaxLogo />,
    },
    {
      key: "0x539",
      value: "Local Chain",
      icon: <LocalLogo />,
    }
  ];

const Chains = () => {
    const { switchNetwork, chainId, chain } = useChain();
    const { isAuthenticated } = useMoralis();
    const [selected, setSelected] = useState<MenuItem>();
    
    console.log("chain", chain);

    useEffect(() : void => {
            if (chainId) {
                const newSelected = menuItems.find((item) => item.key === chainId);
                setSelected(newSelected);
                console.log("current chainId: ", chainId);
            }
        }, [chainId]);
    
    const handleMenuClick = (e: MouseEvent, item: MenuItem) => {
        console.log("switch to: ", item.key);
        switchNetwork(item.key);
    };

    const menu = (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className={classNames(styles.mainActionBtn, 'dark:bg-c-primary dark:hover:bg-c-l-primary dark:text-white dark:hover:text-black')}>
                
                { selected ? selected?.icon : "ss"}
                
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="py-1">
                        {menuItems.map((item) => (
                            <Menu.Item>
                            {({ active }) => (
                                    <button
                                        onClick={(e) => { handleMenuClick(e, item) }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex items-center px-4 py-2 text-sm'
                                        )}
                                    >
                                        <span className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true">
                                            { item.icon }
                                        </span>
                                        { item.value }
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
    
    if (!chainId || !isAuthenticated) return null;

    return menu;
}

export default Chains