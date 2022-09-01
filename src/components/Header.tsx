import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { IgniteIcon } from '@/icons/Ignite';
import { PowerOffIcon } from '@/icons/PowerOffIcon';
import { OnlyAuth } from './OnlyAuth';
import { Avatar } from './Avatar';

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
  const { data: session } = useSession();
  const [, setPortalNode] = useHeaderContext();
  return (
    <header className="bg-gray-2 py-5">
      <div className="grid grid-cols-3 justify-center items-center max-w-[1120px] mx-auto px-3">
        <div ref={setPortalNode} />
        <Link href="/">
          <a className="text-lg sm:text-2xl font-bold text-gray-7 flex items-center gap-4 justify-self-center col-start-2">
            <IgniteIcon width="55" height="51" />
            Ignite Feed
          </a>
        </Link>
        <OnlyAuth>
          <div className="flex items-center gap-1 justify-self-end">
            <Link href="/profile">
              <a className="lg:hidden">
                <Avatar
                  src={session?.user.image}
                  alt={`Foto de perfil de ${session?.user.name}`}
                  className="w-12 h-12"
                />
              </a>
            </Link>

            <button
              onClick={() => signOut()}
              className="justify-self-end p-2 rounded-md hover:bg-gray-1 transition-colors ease-linear"
            >
              <PowerOffIcon width="18px" height="18px" />
            </button>
          </div>
        </OnlyAuth>
        {!session ? (
          <Link href="/login">
            <a className="justify-self-end py-2 px-3.5 rounded-md hover:bg-gray-1 transition-colors ease-linear">
              Login
            </a>
          </Link>
        ) : null}
      </div>
    </header>
  );
};
