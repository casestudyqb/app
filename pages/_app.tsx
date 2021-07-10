import React from "react";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import "tailwindcss/tailwind.css";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Provider>

    // <Provider session={pageProps.session}>
    //   <Component {...pageProps} />
    // </Provider>
  );
};
 
export default App;
