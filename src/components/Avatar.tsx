import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { useSession } from 'next-auth/react';

interface AvatarProps extends React.ComponentPropsWithoutRef<'div'> {
  withBorder?: boolean;
  src: string | undefined | null;
  alt: string;
}

export const Avatar = ({ src = '', alt, withBorder = false, className, ...props }: AvatarProps) => {
  const { data: session } = useSession();
  return (
    <AvatarPrimitive.Root
      {...props}
      className={`w-[60px] h-[60px] rounded-lg bg-gray-2 p-1 select-none ${
        withBorder ? 'border-2 border-brand-green-light' : ''
      } ${className}`}
    >
      <AvatarPrimitive.Image
        draggable={false}
        className="rounded-[5px]"
        src={src ?? ''}
        alt={alt}
      />
      <AvatarPrimitive.Fallback
        delayMs={600}
        className="bg-gray-1 w-full h-full grid place-items-center rounded-[5px] text-2xl"
      >
        {session?.user.name?.[0]}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
