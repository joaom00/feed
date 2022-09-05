import React from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { HeaderProvider } from '@/components/Header';

import '../styles/globals.css';
import Head from 'next/head';

export type NextPageWithLayout<Props = {}, InitialProps = Props> = NextPage<Props, InitialProps> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Head>
            <title>Feed</title>
          </Head>
          <HeaderProvider>{getLayout(<Component {...pageProps} />)}</HeaderProvider>
        </SessionProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
