import { NextApiRequest, NextApiResponse, NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

type ApiRequest = NextApiRequest & { }
type ApiResponse = NextApiResponse & { }

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
    auth: boolean
}
  
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}