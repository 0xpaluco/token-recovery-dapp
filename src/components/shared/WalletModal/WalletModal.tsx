import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import Metamask from "../icons/metamaskWallet.png";
import WalletConnect from "../icons/wallet-connect.svg";

const connectors = [
    {
      title: "Metamask",
      icon: Metamask,
      connectorId: "injected",
      priority: 1,
    },
    {
      title: "WalletConnect",
      icon: WalletConnect,
      connectorId: "walletconnect",
      priority: 2,
    }
]

interface ModalProps {
    open: boolean;
    setOpen: any;
    authenticate: (options?: {} | undefined) => {};
}

const WalletModal = (props: ModalProps) => {
    const open = props.open;
    const setOpen = props.setOpen;

    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
  
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div style={{ padding: "10px", display: "flex", justifyContent: "center", fontWeight: "700", fontSize: "20px" }}>
                    Connect Wallet
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    {connectors.map(({ title, icon, connectorId }, key) => (
                    <div
                        className='items-center flex flex-col h-auto justify-center mx-auto px-5 py-1 hover:bg-gray-100 cursor-pointer'
                        key={key}
                        onClick={async () => {
                        try {
                            props.authenticate({ provider: connectorId  });
                            window.localStorage.setItem("connectorId", connectorId);
                            setOpen(false);
                        } catch (e) {
                            console.error(e);
                        }
                        }}
                    >
                        <Image src={icon} alt={title} className='self-center fill-current flex-shrink-0 mb-2 h-8' />
                        <span style={{ fontSize: "14px" }}>{title}</span>
                    </div>
                    ))}
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    )
}

export default WalletModal;