import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { IgniteIcon } from '@/icons/Ignite';
import { PowerOffIcon } from '@/icons/PowerOffIcon';

type HeaderContextValue = [
  HTMLDivElement | null,
  React.Dispatch<React.SetStateAction<HTMLDivElement | null>>
];
const HeaderContext = React.createContext<HeaderContextValue | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const portalNodeState = React.useState<HTMLDivElement | null>(null);
  return <HeaderContext.Provider value={portalNodeState}>{children}</HeaderContext.Provider>;
};

const useHeaderContext = () => {
  const context = React.useContext(HeaderContext);
  if (!context) {
    throw new Error('Missing HeaderProvider');
  }
  return context;
};

export const HeaderPortal = ({ children }: { children: React.ReactNode }) => {
  const [portalNode] = useHeaderContext();
  return portalNode ? ReactDOM.createPortal(children, portalNode) : null;
};

export const Header = () => {
  const [, setPortalNode] = useHeaderContext();
  return (
    <header className="bg-gray-2 py-5">
      <div className="grid grid-cols-3 justify-center items-center max-w-[1120px] mx-auto">
        <div ref={setPortalNode} />
        <Link href="/">
          <a className="text-2xl font-bold text-gray-7 flex items-center gap-4 justify-self-center col-start-2">
            <IgniteIcon />
            Ignite Feed
          </a>
        </Link>
        <button
          onClick={() => signOut()}
          className="justify-self-end p-2 rounded-md hover:bg-gray-1 transition-colors ease-linear"
        >
          <PowerOffIcon width="18px" height="18px" />
        </button>
      </div>
    </header>
  );
};
