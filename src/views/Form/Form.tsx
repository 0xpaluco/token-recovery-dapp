import Head from 'next/head'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CalendarIcon, PaperClipIcon, TagIcon, UserCircleIcon, PhotographIcon, CodeIcon, LinkIcon, AtSymbolIcon } from '@heroicons/react/solid'
import { classNames } from '@helpers/ui'
import { Tab } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'

const tags = [
    { name: 'Untagged', value: null },
    { name: 'Journal', value: 'engineering' },
    { name: 'Analizys', value: 'analizys' },
    { name: 'Recap', value: 'recap' },
// More items...
]
const status = [
    { name: 'Draft', value: 'draft' },
    { name: 'Published', value: 'published' },
// More items...
]
  

interface FormViewProps {
    title: string
    defaultValues: any
    postDoc: any

}

const FormView = ({title, defaultValues, postDoc }: FormViewProps) => {
    const { register, handleSubmit, reset, watch } = useForm({ defaultValues, mode: 'onChange' });

    const [labelled, setLabelled] = useState(tags[0])
    const [dated, setDated] = useState(status[0])

    const updatePost = async ({ content, status }: any) => {
        
        await postDoc.update({ content, status });
        reset({ content, status });
    
       // toast.success('Post updated successfully!')
      };
    
    return (
        <div >
            <Head>
                <title>{title}</title>
                <meta name="description" content="Trading Community" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form action="#" className="relative" onSubmit={handleSubmit(updatePost)}>


            <Tab.Group>
                {({ selectedIndex }) => (
                <>
                <Tab.List className="flex items-center">
                    <Tab
                        className={({ selected }) =>
                        classNames(
                            selected
                            ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'
                            : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100',
                            'px-3 py-1.5 border border-transparent text-sm font-medium rounded-md'
                        )
                        }
                    >
                        Write
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                        classNames(
                            selected
                            ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'
                            : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100',
                            'ml-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md'
                        )
                        }
                    >
                        Preview
                    </Tab>

                    {/* These buttons are here simply as examples and don't actually do anything. */}
                    {selectedIndex === 0 ? (
                        <div className="ml-auto mr-2 flex items-center space-x-5">
                            <div className="flex items-center">
                                <button
                                type="button"
                                className="-m-2.5 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                                >
                                <span className="sr-only">Insert link</span>
                                <LinkIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="flex items-center">
                                <button
                                type="button"
                                className="-m-2.5 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                                >
                                <span className="sr-only">Insert code</span>
                                <CodeIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="flex items-center">
                                <button
                                type="button"
                                className="-m-2.5 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                                >
                                <span className="sr-only">Mention someone</span>
                                <AtSymbolIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    ) : <div className="ml-auto flex items-center space-x-5"/>}
                </Tab.List>

                <Tab.Panels className="mt-2">
                    <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                    <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                        <label htmlFor="title" className="sr-only"> Title </label>
                        <input type="text" {...register("title")} id="title" className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0" placeholder="Title" />
                        
                        <label htmlFor="content" className="sr-only"> Content </label>
                        <textarea
                            rows={20}
                            id="content"
                            {...register("content")}
                            className="block w-full border-0 py-2 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
                            defaultValue={''}
                            placeholder={'## content goes here'}
                            />

                        {/* Spacer element to match the height of the toolbar */}
                        <div aria-hidden="true">
                        <div className="py-2">
                            <div className="h-9" />
                        </div>
                        <div className="h-px" />
                        <div className="py-2">
                            <div className="py-px">
                            <div className="h-9" />
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 inset-x-px">
                        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
                        <div className="flex flex-nowrap justify-end py-2 px-2 space-x-2 sm:px-3">
                        

                        <Listbox as="div" value={labelled} onChange={setLabelled} className="flex-shrink-0">
                            {({ open }) => (
                            <>
                                <Listbox.Label className="sr-only">Add a Tag</Listbox.Label>
                                <div className="relative">
                                <Listbox.Button className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
                                    <TagIcon
                                    className={classNames(
                                        labelled.value === null ? 'text-gray-300' : 'text-gray-500',
                                        'flex-shrink-0 h-5 w-5 sm:-ml-1'
                                    )}
                                    aria-hidden="true"
                                    />
                                    <span
                                    className={classNames(
                                        labelled.value === null ? '' : 'text-gray-900',
                                        'block truncate ml-2 '
                                    )}
                                    >
                                    {labelled.value === null ? 'Tag' : labelled.name}
                                    </span>
                                </Listbox.Button>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute right-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {tags.map((label) => (
                                        <Listbox.Option
                                        key={label.value}
                                        className={({ active }) =>
                                            classNames(
                                            active ? 'bg-gray-100' : 'bg-white',
                                            'cursor-default select-none relative py-2 px-3'
                                            )
                                        }
                                        value={label}
                                        >
                                        <div className="flex items-center">
                                            <span className="block font-medium truncate">{label.name}</span>
                                        </div>
                                        </Listbox.Option>
                                    ))}
                                    </Listbox.Options>
                                </Transition>
                                </div>
                            </>
                            )}
                        </Listbox>

                        <Listbox as="div" value={dated} onChange={setDated} className="flex-shrink-0">
                            {({ open }) => (
                            <>
                                <Listbox.Label className="sr-only">Status</Listbox.Label>
                                <div className="relative">
                                <Listbox.Button className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
                                    <CalendarIcon
                                    className={classNames(
                                        dated.value === null ? 'text-gray-300' : 'text-gray-500',
                                        'flex-shrink-0 h-5 w-5 sm:-ml-1'
                                    )}
                                    aria-hidden="true"
                                    />
                                    <span
                                    className={classNames(
                                        dated.value === null ? '' : 'text-gray-900',
                                        'block truncate ml-2'
                                    )}
                                    >
                                    {dated.value === null ? 'Due date' : dated.name}
                                    </span>
                                </Listbox.Button>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute right-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {status.map((status) => (
                                        <Listbox.Option
                                        key={status.value}
                                        className={({ active }) =>
                                            classNames(
                                            active ? 'bg-gray-100' : 'bg-white',
                                            'cursor-default select-none relative py-2 px-3'
                                            )
                                        }
                                        value={status}
                                        >
                                        <div className="flex items-center">
                                            <span className="block font-medium truncate">{status.name}</span>
                                        </div>
                                        </Listbox.Option>
                                    ))}
                                    </Listbox.Options>
                                </Transition>
                                </div>
                            </>
                            )}
                        </Listbox>
                        </div>

                        {/**  */}
                        <div className="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
                            <div className="flex">
                                <button type="button" className="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-400 group" >
                                    <PhotographIcon className="-ml-1 h-5 w-5 mr-2 group-hover:text-gray-500" aria-hidden="true" />
                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 italic">Upload thumbnail</span>
                                </button>
                            </div>
                            <div className="flex-shrink-0">
                                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Save
                                </button>
                            </div>
                        </div>

                    </div>
                    </Tab.Panel>
                    <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                        <div className="border-b">
                        <div className="mx-px mt-px px-3 pt-2 pb-12">
                            
                            <ReactMarkdown>{watch('content')}</ReactMarkdown>
                        </div>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>

              </>
               )}
            </Tab.Group>
                
            </form>
        </div>
    )
}

export default FormView
