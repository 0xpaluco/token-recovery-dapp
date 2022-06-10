
import { useERC20Balances, useNativeBalance } from "react-moralis";
import { tokenValueTxt } from "@helpers/formater";
import { useMemo } from "react";
import { Divider, Loader } from "@components/shared";
import { classNames } from "@helpers/ui";

interface ERC20BalanceProps {
    address: string
}


const ERC20Balance = (props: ERC20BalanceProps) => {
    const account = props.address;
  
    const { fetchERC20Balances, data, isLoading, isFetching, error } = useERC20Balances({ address: account });
    const { getBalances, data: nativeBalance, nativeToken } = useNativeBalance({ address: account });
  
    
    const fullBalance = useMemo(() => {
      if (!data || !nativeBalance) return null;
      return [
        {
          balance: nativeBalance.balance,
          decimals: nativeToken?.decimals.toString(),
          name: nativeToken?.name,
          symbol: nativeToken?.symbol,
          token_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          thumbnail: "",
          logo: ""
        },
        ...data,
      ];
    }, [data, nativeBalance, nativeToken]);
  
    
  
    return (
      <div>
        {error && <>{JSON.stringify(error)}</>}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        
  
        <div className="px-4 sm:px-6 lg:px-8">
  
          <Divider title='Coins'/>
    
          {/* <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="text-sm text-gray-700">
                <button onClick={() => fetchERC20Balances({ params: { chain: "0x1", address: account } }) }>Refetch</button>
              </p>
            </div>
            
          </div> */}

          {(isLoading || isFetching) && <>
              <Loader show={isFetching}/>
          </>}

        <div className={classNames((isLoading || isFetching) ? "hidden" : "", "mt-8 flex flex-col")}>
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Token
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Balance
                      </th>
  
                     
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {fullBalance?.map((token) => (
                      <tr key={token.symbol}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className={classNames(token.thumbnail ? "h-10 w-10 rounded-full" : "hidden")} src={token.thumbnail} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{token.symbol}</div>
                              <div className="text-gray-500">{token.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{tokenValueTxt(parseInt(token.balance!), parseInt(token.decimals!), token.symbol!)}</div>
                          <div className="text-gray-500 hidden">{token.decimals}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      </div>
    );
  };

  export default ERC20Balance