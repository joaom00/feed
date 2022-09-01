import { GitHubIcon } from '@/icons/GitHub';
import { GoogleIcon } from '@/icons/GoogleIcon';
import { TwitterIcon } from '@/icons/TwitterIcon';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { signIn } from 'next-auth/react';

interface LoginDialogProps {
  open: DialogPrimitive.DialogProps['open'];
  onOpenChange: DialogPrimitive.DialogProps['onOpenChange'];
}

export const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="bg-gray-1/50 fixed inset-0 animate-overlayShow" />

        <DialogPrimitive.Content className="bg-gray-2 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl p-10 animate-contentShow">
          <DialogPrimitive.Title className="text-3xl font-bold text-white mt-8">
            Escolha uma opção para entrar
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-4 mb-14 text-gray-5">
            Utilize algum dos serviços abaixo para entrar na nossa plataforma.
          </DialogPrimitive.Description>

          <div className="space-y-6">
            <button className="py-3 bg-[#EA4335] rounded-lg w-full text-white font-bold inline-flex justify-center items-center gap-2">
              <GoogleIcon width="24px" height="24px" />
              Entrar com o Google
            </button>
            <button className="py-3 bg-[#1DA1F2] rounded-lg w-full text-white font-bold inline-flex justify-center items-center gap-2">
              <TwitterIcon width="24px" height="24px" />
              Entrar com o Twitter
            </button>
            <button
              onClick={() => signIn('github')}
              className="py-3 bg-[#171515] rounded-lg w-full text-white font-bold inline-flex justify-center items-center gap-2"
            >
              <GitHubIcon width="24px" height="24px" />
              Entrar com o GitHub
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
