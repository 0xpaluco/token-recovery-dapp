import { Divider, Loader } from "@components/shared";
import { useEffect, useState } from "react";
import { useNFTBalances } from "react-moralis";
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

import _ from 'lodash';
import { classNames } from "@helpers/ui";

interface NFTListProps {
    address: string
}

interface NFTsByCollection {
  [key:string]: Array<any>
}

export default function NFTBalance(props: NFTListProps) {

    const account = props.address;
    const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances({ address: account });
    const results = data?.result;
    const [byCollection, setByCollection] = useState<NFTsByCollection>({});

    const x = byCollection["x"];
    
    useEffect(() => {
      const c: NFTsByCollection = {}
      _.map(results, (token) => {
        const key = `${token.symbol}-${token.name}`
        if(c[key])
          c[key].push(token)
        else
          c[key] = [token]
      });
      setByCollection(c)
      console.log(byCollection);
      
    },
    [data])
  
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        {error && <>{JSON.stringify(error)}</>}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <Divider title='NFTs'/>


        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="text-sm text-gray-700">
              <button onClick={() => getNFTBalances({ params: { chain: "0x1", address: account } })}>Refetch NFTBalances</button>
            </p>
          </div>
          
        </div>

        {(isLoading || isFetching) && <>
            <Loader show={isFetching}/>
        </>}
  
        
        
        { _.keysIn(byCollection).map((address) => (
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">

          <Disclosure as="div" key={address} defaultOpen={true} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-medium text-gray-900">{address}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <ul role="list" className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {byCollection[address]?.map((token) => (
                          <li key={token.token_id} className="relative">
                            <div className="group block w-full aspect-w-10 aspect-h-10 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                              <img src={token.image} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                              <button type="button" className="absolute inset-0 focus:outline-none">
                                <span className="sr-only">View details for {token.name} {token.token_id}</span>
                              </button>
                            </div>
                            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{token.name} #{token.token_id}</p>
                            {/* <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.token_id}</p> */}
                          </li>
                        ))}
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
          
            


          </dl>
        ))}

        
       

      </div>
    )
}