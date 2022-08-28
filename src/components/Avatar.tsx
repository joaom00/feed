interface AvatarProps extends React.ComponentPropsWithoutRef<'div'> {
  withBorder?: boolean;
  src: string | undefined | null;
  alt: string;
}

export const Avatar = ({ src = '', alt, withBorder = false, className, ...props }: AvatarProps) => {
  return (
    <div
      {...props}
      className={`w-[60px] h-[60px] rounded-lg bg-gray-2 flex justify-center items-center select-none ${
        withBorder ? 'border-2 border-brand-green-light' : ''
      } ${className}`}
    >
      <img draggable={false} className="w-[49px] h-[49px] rounded-[5px]" src={src ?? ''} alt={alt} />
    </div>
  );
};
