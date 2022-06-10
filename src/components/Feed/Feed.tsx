import { classNames } from "@helpers/ui";
import { BookmarkAltIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";

/* This example requires Tailwind CSS v2.0+ */

interface TabsProps {
  tabs: {
    name: string;
    href: string;
    current: (this: any, path: string) => boolean
}[]
}

const Tabs = (props: TabsProps) => {
  const router = useRouter();

  const navigate = (tabName: string) => {
    console.log(tabName)

    for (let index = 0; index < props.tabs.length; index++) {
      const tab = props.tabs[index];
      if(tab.name === tabName){
        router.push(tab.href)
      }
    }
    //
  }

    return (
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            onChange={(e) => navigate(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-lg bg-white border-0 focus:outline-none sm:text-sm text-grey-500 font-medium rounded-md"
            
          >
            {props.tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {props.tabs.map((tab) => (
                <Link  key={tab.name} href={tab.href}>
                  <a
                    className={classNames(
                      tab.current(router.asPath)
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg'
                    )}
                    aria-current={tab.current(router.asPath) ? 'page' : undefined}
                  >
                    {tab.name}
                  </a>
                </Link>
                
              ))}
            </nav>
          </div>
        </div>
      </div>
    )
  }

const JournalPostCell = ({ post } : any) : JSX.Element => {
  
  return (
      <div key={post.title} className="flex rounded-lg overflow-hidden">
            {/** Body */}
          <div className="flex-1 bg-white p-2 md:p-6 flex flex-col justify-between">

            {/** Author Block */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href={post.author.href}>
                  <a>
                    <span className="sr-only">{post.author.name}</span>
                    <img className="h-6 w-6 rounded-full" src={post.author.imageUrl} alt="" />
                  </a>
                </Link>
                  
              </div>
              <div className="ml-3 flex space-x-1">
                  <p className="text-sm text-gray-900">
                    <Link href={post.author.href}>
                      <a className="hover:underline">
                          {post.author.name}
                      </a>
                    </Link>
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime={post.datetime}>{post.date}</time>
                </div>
              </div>
            </div>


            <div className="flex-1">
              <div className="flex justify-between">
                <Link href={post.href}>
                  <a  className="block mt-2">
                    <h4 className="text-lg md:text-xl font-bold">{post.title}</h4>
                    <p className="mt-1 text-base text-gray-500 hidden sm:line-clamp-2"> {post.description} </p>
                  </a>
                </Link>
                <div className="ml-4 flex-shrink-0">
                  <img className={classNames(
                    post.imageUrl ? "h-16 w-16 md:h-24 md:w-24 border border-gray-300 bg-white text-gray-300" : "hidden")} src={post.imageUrl} alt="" />
                </div>
              </div>

              {/** Action */}
              <div className="mt-3 relative flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 block">
                    <span className="inline-flex items-center mx-1 px-2 py-1 rounded-lg text-xs font-medium bg-green-200 text-green-800">
                    <Link href={post.category.href}>
                      <a className="hover:underline">
                        {post.category.name}
                      </a>
                    </Link>
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="text-gray-500 font-light mx-1">{post.readingTime} read</span>
                </p>

                <div className="">
                  <button className={classNames(
                        'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-3 py-2 text-sm font-medium rounded-md' )} >

                        <BookmarkAltIcon className={classNames(
                            'text-gray-400 group-hover:text-gray-500',
                            'flex-shrink-0 mx-3 h-6 w-6'
                        )} aria-hidden="true" />
                        
                    </button>
                </div>
                <div className="w-auto"/>
              </div>

            </div>
          </div>

      </div>
  )
}

interface FeedProps {
  navigation: TabsProps['tabs'];
  posts: any[]
}

const Feed = (props: FeedProps) : JSX.Element => {
    return (
        <>
        <Tabs tabs={props.navigation}/>
        <ul role="list" className="divide-y divide-gray-200 mb-8">
        {props.posts.map((post) => (
            <li key={post.id} className="bg-white px-4 py-2 mt-2 sm:px-0">
                <JournalPostCell post={post}/>
            </li>
        ))}
        </ul>
        </>
        
    )
}

export default Feed;