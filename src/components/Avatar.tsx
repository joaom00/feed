interface AvatarProps extends React.ComponentPropsWithoutRef<'div'> {}

export const Avatar = ({ className, ...props }: AvatarProps) => {
  return (
    <div
      {...props}
      className={`w-[60px] h-[60px] rounded-lg bg-gray-2 border-2 border-brand-green-light flex justify-center items-center select-none ${className}`}
    >
      <img
        draggable={false}
        className="w-[49px] h-[49px] rounded-[5px]"
        src="https://github.com/joaom00.png"
        alt="Foto de perfil de João Pedro"
      />
    </div>
  );
};
