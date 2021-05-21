import React, {ReactNode} from "react";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

type Props = {
  children: ReactNode;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Layout: React.FC<Props> = (props) => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const [session, loading] = useSession();
  
  // Initial Menu
  let navigation = [{ name: 'Home', link: "/"}]
  let profile = null
  let right = null

  if (loading) {
    navigation = [{ name: 'Validating session ...', link: null }]
    profile = null
  }

  if (!session) {
    navigation = [{ name: 'Home', link: "/"}]
    profile = [
      // { name: 'Your Profile', link: "/" }, 
      // { name: 'Settings', link: "/" },
      { name: 'Sign In', link: "/api/auth/signin", onClick: null}
    ]
  }

  if (session) {
    navigation = [{ name: 'Home', link: "/"}]
    profile = [
                // { name: 'Your Profile', link: "test" }, 
                // { name: 'Settings', link: "test2" },
                { name: 'Sign out', link: null, onClick: () => signOut()}
              ]
  }
  
  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="block lg:hidden h-8 w-auto">
                      <Image 
                        src="/images/csqb_small_logo.png" 
                        alt="small csqb logo" width="100" height="38" 
                      />
                    </div>
                    <div className="hidden lg:block h-4 w-auto flex-shrink-0">
                      <Image
                        src="/images/csqb_logo.png" 
                        alt="csqb logo" width="150" height="18" 
                      />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item, itemIdx) =>
                        itemIdx === 0 ? (
                          <Fragment key={item.name}>
                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            <Link href={item.link}>                            
                              <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                {item.name}
                              </a>
                            </Link>
                          </Fragment>
                        ) : (
                          <Link href={item.link} key={item.name}>
                          <a
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          >
                            {item.name}
                          </a>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  {session ? 
                  <div className="ml-4 flex items-center md:ml-6">
                    <p className="text-white">
                      {session.user.name} ({session.user.email})
                    </p>
                    <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={session.user.image}
                                alt={session.user.name}
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {profile.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.link}
                                      onClick={item.onClick}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div> :   
                      <div className="right">
                        <Link href="/api/auth/signin">
                          <a data-active={isActive("/signup")} className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium">
                            Log In 
                          </a>
                        </Link>
                      </div> 
                  }
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, itemIdx) =>
                  itemIdx === 0 ? (
                    <Fragment key={item.name}>
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <Link href={item.link}>
                        <a className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                          {item.name}
                        </a>
                      </Link>
                    </Fragment>
                  ) : (
                    <Link href={item.link} key={item.name}>
                      <a
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        {item.name}
                      </a>
                    </Link>
                  )
                )}
              </div>
              {session ? <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={session.user.image}
                      alt={session.user.name}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{session.user.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{session.user.email}</div>
                  </div>
                  <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {profile.map((item) => (
                      <a onClick={item.onClick} key={item.name}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </a>
                   
                  ))}
                </div>
              </div> : 
              <div className="mt-3 px-2 space-y-1">
                <Link href="/api/auth/signin">
                  <a data-active={isActive("/signup")} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700">
                    Log In 
                  </a>
                </Link>
              </div>

              }
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header> */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          {props.children}
          {/* /End replace */}
        </div>
      </main>
    </div>
  )
}

export default Layout;