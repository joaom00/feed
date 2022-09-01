import { useSession } from 'next-auth/react';

interface OnlyAuthProps {
  children: React.ReactElement;
}

export const OnlyAuth = ({ children }: OnlyAuthProps) => {
  const { data: session } = useSession();

  return session ? children : null;
};
