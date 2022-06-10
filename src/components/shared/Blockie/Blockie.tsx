import Blockies from "react-blockies";
import { useMoralis } from "react-moralis";

interface BlockieProps {
  address: string;
  currentWallet: boolean;
  className?: string
}

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

const Blockie = (props: BlockieProps) => {
  const { account, isAuthenticated } = useMoralis();
  
  if (!props.address && (!account || !isAuthenticated)){
     return (
      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    );
  }

  const acc = (account?.toLowerCase() || "");
  return (
    <Blockies size={8} seed={props.currentWallet ? acc : props.address.toLowerCase() } className={props.className} {...props} />
  );
}

export default Blockie;