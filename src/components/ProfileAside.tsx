import Link from 'next/link';
import { Session } from 'next-auth';

import { EditIcon } from '@/icons/EditIcon';

import { Avatar } from '@/components/Avatar';

interface ProfileAsideProps {
  user: Session['user'] | null;
}

export const ProfileAside = ({ user }: ProfileAsideProps) => {
  return (
    <aside className="bg-gray-2 rounded-lg grid-rows-profile-aside overflow-hidden text-center h-max hidden lg:grid">
      <img
        className="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1661336581000-b0c41a876950?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
        alt="Capa de perfil de João Pedro"
      />
      <Avatar
        withBorder
        src={user?.image}
        alt={`Foto de perfil de ${user?.name}`}
        className="mx-auto -mt-[30px]"
      />
      <p className="font-bold mt-4">{user?.name}</p>
      <p className="text-sm text-gray-5 break-all max-w-[90%] mx-auto">{user?.bio}</p>
      <div className="pt-6 pb-8 border-t border-gray-3 mt-6">
        <Link href="/profile">
          <a className="bg-transparent pt-4 pb-[14px] px-6 font-bold text-brand-green-light inline-flex justify-center items-center gap-[10px] rounded-lg border border-brand-green-light leading-none hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors ease-linear">
            <EditIcon />
            Editar seu perfil
          </a>
        </Link>
      </div>
    </aside>
  );
};
