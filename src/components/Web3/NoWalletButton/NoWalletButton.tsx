import { classNames } from '@helpers/ui';
import { PlusIcon, IdentificationIcon } from '@heroicons/react/solid'
import { Fragment, useState } from 'react'
import { useMoralis } from "react-moralis";
import { WalletModal } from '@components/index';

const NoWalletButton = () => {

    const { authenticate, isAuthenticated, logout, account, chainId } = useMoralis();
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsModalVisible(true)}
            className={classNames("w-full flex items-center justify-center px-8 py-3 border-2 border-transparent text-base font-medium rounded-md text-black dark:border-c-primary border-c-secondary bg-c-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10")}
          >
            Connect Wallet
          </button>
          <WalletModal open={isModalVisible} setOpen={() => setIsModalVisible(false)} authenticate={authenticate} />
        </div>
      )
}

export default NoWalletButton;