import { classNames } from '@helpers/ui';
import { PlusIcon, IdentificationIcon } from '@heroicons/react/solid'
import { Fragment, useState } from 'react'
import { useMoralis } from "react-moralis";
import { WalletModal } from '@components/index';

const ConnectWallet = () => {

    const { authenticate, isAuthenticated, logout, account, chainId } = useMoralis();
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div className="text-center">
          <IdentificationIcon className='mx-auto dark:text-c-primary text-c-secondary h-12 w-12'></IdentificationIcon>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Login</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by connecting a Wallet.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsModalVisible(true)}
              className={classNames(
                'dark:bg-c-primary dark:hover:bg-c-l-primary dark:text-white dark:hover:text-black bg-c-secondary text-black hover:bg-c-l-secondary',  
                "inline-flex py-2 px-4 border border-transparent rounded-md text-base font-medium ")}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Connect Wallet
            </button>
          </div>
          <WalletModal open={isModalVisible} setOpen={() => setIsModalVisible(false)} authenticate={authenticate} />
        </div>
      )
}

export default ConnectWallet;