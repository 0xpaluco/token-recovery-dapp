import { classNames } from "@helpers/ui";
import { navigation } from "@helpers/routes";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BottomNav() {
    const router = useRouter();


    return (
    <section id="bottom-navigation" className="lg:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow-inner h-auto">
        <div id="tabs" className="flex justify-between">
            {navigation.map((item) => (
                <Link href={item.href} key={item.name}>
                    <a 
                        className={classNames(
                        item.current(router.asPath) ? 'text-gray-900' : 'text-gray-300 hover:bg-gray-50 hover:text-gray-900',
                        'w-full hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1'
                        )}
                        aria-current={item.current(router.asPath) ? 'page' : undefined} >
                        <item.icon className={classNames(
                            item.current(router.asPath) ? 'text-black' : 'text-gray-400',
                            'h-8 w-8 inline-block my-1'
                        )}
                        aria-hidden="true"
                        />
                        <span className="tab tab-home block text-xs">{item.name}</span>
                    </a>
                </Link>
            ))}
        </div>
    </section>
    )
}