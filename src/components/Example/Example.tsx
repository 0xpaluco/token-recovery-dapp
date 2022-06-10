import { NoWalletButton } from "@components/Web3";
import { classNames } from "@helpers/ui";

interface HeroProps {
    isAuthenticated?: boolean;
}

const Example = ({ isAuthenticated  }: HeroProps) => {
    

    return (
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <main className="lg:relative">
                <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
                    { "master" }
                </div>
                
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    { "detail" }
                </div>
            </main>
        </div>
    )
}

export default Example