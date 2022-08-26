import TextareaAutosize, { type TextareaAutosizeProps } from 'react-textarea-autosize';

export const Textarea = (props: TextareaAutosizeProps) => {
  return (
    <TextareaAutosize
      {...props}
      className="w-full rounded-lg bg-gray-1 px-4 py-[13px] placeholder:text-gray-4 text-gray-6 min-h-[96px] focus:outline-none focus:outline-brand-green-light resize-none"
    />
  );
};
