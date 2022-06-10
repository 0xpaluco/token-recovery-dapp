import '../styles/globals.css'
import { AppPropsWithLayout } from '@/types'
import { MoralisProvider } from "react-moralis";
import { useMoralis } from "react-moralis";
import { useEffect } from 'react';
import { AuthView } from "@views/index";

const SERVER_URL: string = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL! || "";
const APP_ID: string = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID! || "";




if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  
}

function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <MoralisProvider 
      appId={APP_ID} 
      serverUrl={SERVER_URL} >
        {Component.auth ? (
          <Auth>
            {getLayout( <Component {...pageProps} /> )}
          </Auth>
        ) : (
          getLayout( <Component {...pageProps} /> )
        )}
    </MoralisProvider>
  ) 
}

function Auth({ children }: any) {
  
  const { isAuthenticated, isAuthenticating, user, } = useMoralis();
  
  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isAuthenticated && user) {
    return children
  }

  if (isAuthenticating) {
    return <div>Authenticating...</div>
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <AuthView />
}

export default App
