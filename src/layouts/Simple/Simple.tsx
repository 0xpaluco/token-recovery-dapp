import { Footer } from '@components/index';
import React from 'react';
import { Topbar } from './components';


interface Props {
  children: React.ReactNode;
  themeMode: string;
  themeToggler: Function;
  className?: string;
};

const Simple = ({ themeMode, themeToggler, children, className }: Props): JSX.Element => {

  return (
    <div className={`${themeMode}`}>
      <Topbar themeMode={themeMode} themeToggler={themeToggler} className={className} />
      
      <main className="-mt-28">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {/* Replace with your content */}
              {children}
            {/* /End replace */}
          </div>
        </main>
        <Footer/>
    </div>
  );
};

export default Simple;
