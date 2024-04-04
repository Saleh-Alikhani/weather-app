import loading from '@assets/lotties/Animation - 1712234874068.json';
import Page from '@components/Page';
import { Row } from 'antd';
import Head from 'next/head';
import { useState } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

const StyledLottieWrapper = styled(Row)`
  background-color: #f2f2f2;
`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 4000);

  return (
    <>
      <Head>
        <title>SalehAlikhani&apos;s weather App</title>
        <meta name="description" content="SalehAlikhani's weather App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {isLoading ? (
          <StyledLottieWrapper>
            <Lottie
              style={{ height: '100vh' }}
              options={{ animationData: loading }}
            />
          </StyledLottieWrapper>
        ) : (
          <Page />
        )}
      </main>
    </>
  );
}
