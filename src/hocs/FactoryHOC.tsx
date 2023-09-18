import { Suspense } from 'react';

interface Props {
  children: React.ReactNode;
}

export function Factory({ children }: Props) {
  function renderLoading() {
    return <p>Loading...</p>;
  }

  return <Suspense fallback={renderLoading()}>{children}</Suspense>;
}