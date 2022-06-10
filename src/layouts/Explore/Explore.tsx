import React from 'react';
import { Topbar, Sidenav, BottomNav } from './components';

interface Props {
  children: React.ReactNode;
  themeMode: string;
  themeToggler: Function;
  className?: string;
  aside: any
};

const Explore = ({ themeMode, themeToggler, children, aside: Aside, className }: Props): JSX.Element => {

  return (
    <div className={`${themeMode} min-h-screen bg-gray-100`}>
      <Topbar themeMode={themeMode} themeToggler={themeToggler} />
      <div className="py-6">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <Sidenav />
          <main className="lg:col-span-9 xl:col-span-6">{children}</main>
          <aside className="hidden xl:block xl:col-span-4">
            <Aside/>
          </aside>
          {/** Bottom Nav */}
          <BottomNav />
        </div>
      </div>
      
    </div>
  );
};

export default Explore;
