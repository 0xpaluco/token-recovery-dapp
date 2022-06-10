
import Image from 'next/image'
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { classNames } from '@helpers/ui';
import styles from '@styles/Toggler.module.css'


interface DarkModeTogglerProps {
    /**
     * External classes
     */
    className?: string;
    /**
     * The theme mode
     */
    themeMode?: string;
    /**
     * Theme toggler function
     */
    onClick: () => boolean;
    /**
     * Color of the icon
     */
    fontIconColor?: string;
    // All other props
    [x:string]: any;
  };

const DarkModeToggler = ({ themeMode = 'light', onClick, className, ...rest }: DarkModeTogglerProps) => {
    
    const enabled = themeMode !== 'light'

    return (
        <Switch
          checked={enabled}
          onChange={onClick}
          className={classNames(
            enabled ? 'bg-c-primary focus:ring-c-primary' : 'bg-c-secondary focus:ring-c-secondary',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            className={classNames(
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
            )}
          >
            <span
              className={classNames(
                enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
              )}
              aria-hidden="true"
            >
              <svg className="h-3 w-3 text-c-secondary" fill="currentColor" viewBox="0 0 12 12">
                <path
                  d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              className={classNames(
                enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
              )}
              aria-hidden="true"
            >
              <svg className="h-3 w-3 text-c-primary" fill="currentColor" viewBox="0 0 12 12">
                <path d="M4.52208 7.71754C7.5782 7.71754 10.0557 5.24006 10.0557 2.18394C10.0557 1.93498 10.0392 1.68986 10.0074 1.44961C9.95801 1.07727 10.3495 0.771159 10.6474 0.99992C12.1153 2.12716 13.0615 3.89999 13.0615 5.89383C13.0615 9.29958 10.3006 12.0605 6.89485 12.0605C3.95334 12.0605 1.49286 10.001 0.876728 7.24527C0.794841 6.87902 1.23668 6.65289 1.55321 6.85451C2.41106 7.40095 3.4296 7.71754 4.52208 7.71754Z" />
              </svg>
            </span>
          </span>
        </Switch>
      );
}

export default DarkModeToggler