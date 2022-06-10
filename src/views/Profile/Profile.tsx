/* This example requires Tailwind CSS v2.0+ */
import { Blockie, Feed } from '@components/index';
import { classNames } from '@helpers/ui';
import { getEllipsisTxt, tokenValueTxt } from '@helpers/formater';
import { UserAddIcon } from '@heroicons/react/solid'
import Moralis from 'moralis/types';
import Head from 'next/head';
import { useEnsAddress, useERC20Balances, useMoralis, useNativeBalance, useNFTBalances } from 'react-moralis';

import { useMemo } from 'react';
import { ERC20Balance, NFTBalance } from '@components/Web3';

export default function Profile() {

  const { authenticate, isAuthenticated, isAuthenticating, user, logout } = useMoralis();
  const account = user!.get("ethAddress");
  

    return (
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <Head>
                <title>{"My Wallet"}</title>
                <meta name="description" content="Trading Community" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Banner address={account} logout={logout} />
            <ERC20Balance address={account} />
            <NFTBalance address={account} />
        </div>
    )
}

interface ProfileProps {
    address: string
    logout?: () => Promise<void>
}

function Banner(props: ProfileProps) {

  const account = props.address
  const { name, isLoading, error} = useEnsAddress(account)


  return (
    <div className="md:flex md:items-center md:justify-between md:space-x-5">
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0">
          <div className="relative">
            <Blockie address={account || ""} currentWallet={true} className="h-16 w-16 rounded-full"></Blockie>
            <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
          </div>
        </div>
        {/*
          Use vertical padding to simulate center alignment when both lines of text are one line,
          but preserve the same layout if the text wraps without making the image jump around.
        */}

        <div className="pt-1.5">
          <h1 className={classNames(name ? "text-2xl font-bold text-gray-900": "hidden")}>{name}</h1>
          <h1 className={classNames(!name ? "text-2xl font-bold text-gray-900": "hidden")}>{getEllipsisTxt(account, 6)} </h1>
          <p className={classNames(name ? "text-sm font-medium text-gray-500 cursor-copy": "hidden")}>
            {getEllipsisTxt(account, 16)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
        <button
          onClick={props.logout}
          type="button"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-400 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
        
    </div>
  )
}




