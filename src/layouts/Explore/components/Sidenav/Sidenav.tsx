/* This example requires Tailwind CSS v2.0+ */
import { classNames } from '@helpers/ui'
import { navigation, secondaryNavigation } from '@helpers/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidenav() {
  const router = useRouter();

  return (
    <div className="hidden lg:block lg:col-span-2 xl:col-span-2">
        <nav aria-label="Sidebar" className="sticky top-6">
          <div className="space-y-1">
              {navigation.map((item) => (
                  <Link href={item.href} key={item.name}>
                      <a 
                          className={classNames(
                          item.current(router.asPath) ? 'bg-gray-300 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                          )}
                          aria-current={item.current(router.asPath) ? 'page' : undefined} >
                          <item.icon className={classNames(
                              item.current(router.asPath) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                          )}
                          aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                      </a>
                  </Link>
              ))}
          </div>
          <div className="mt-8">
              <Divider />
              <div className="mt-1 space-y-1" aria-labelledby="projects-headline">
              {secondaryNavigation.map((item) => (
              <Link href={item.href} key={item.name}>
                  <a className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50" >
                      <span className="truncate">{item.name}</span>
                  </a>
              </Link>
              ))}
              </div>
          </div>
        </nav>
    </div>
  )
}

function Divider() {
    return (
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
      </div>
    )
  }