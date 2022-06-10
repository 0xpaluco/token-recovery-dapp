/* This example requires Tailwind CSS v2.0+ */
import { ConnectWallet } from '@components/Web3';
import { XIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { useMoralis } from 'react-moralis';


export default function AuthView() {
  const { authenticate, isAuthenticated,  account, logout } = useMoralis();

  if (isAuthenticated) {
    return (
      <>
        Signed in as {account} <br />
        <button onClick={logout}>Logout</button>
      </>
    )
  }
  return (
    <>
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 dark">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <ExclamationCircleIcon className='mx-auto dark:text-c-primary text-c-secondary h-12 w-12'></ExclamationCircleIcon>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connect with Wallet</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <ConnectWallet/>
          </div>
        </div>
      </div>
    </>
  )
}
