import React, { useState, useEffect, ReactElement } from 'react';

export const useDarkMode = () => {
  const [themeMode, setTheme] = useState('light');
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode: string) => {
    window.localStorage.setItem('themeMode', mode);
    setTheme(mode);
  };

  const [enabled, setEnabled] = useState(false);

  const themeToggler = () => {
    themeMode === 'light' ? setMode('dark') : setMode('light');
    setEnabled(themeMode == 'light');
    return enabled;
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('themeMode');
    localTheme ? setTheme(localTheme) : setMode('light');
    setMountedComponent(true);
  }, []);

  useEffect(() => {
    console.log(`${themeMode}`)
  }, [themeMode]);
  
  return [themeMode, themeToggler, mountedComponent];
};
  

interface Props {
  layout: any;
  component: ReactElement;
  aside?: any;
  // All other props
  [x:string]: any;
};


const WithLayout = ({ component: Component, layout: Layout, aside, ...rest }: Props) : JSX.Element => {
    
    const [themeMode, themeToggler, mountedComponent] = useDarkMode();
    
    useEffect(() => {
      console.log(`what?`)
    }, [mountedComponent]);

    return (
      <div>
        <Layout themeMode={themeMode} themeToggler={themeToggler} aside={aside}>
          {Component}
        </Layout>
      </div>
    );
}

export default WithLayout