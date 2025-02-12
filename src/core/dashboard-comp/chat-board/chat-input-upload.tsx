import CVUploader from "@/components/modals/upload";
import { useModal } from "@/hooks/use-modal";
import { Paperclip } from "lucide-react";
import { useCallback } from "react";

interface ChatInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatInput = ({ input, onInputChange, onSubmit }: ChatInputProps) => {
  const { showModal, hideModal } = useModal();

  const onCancel = useCallback(() => {
    hideModal();
  }, [hideModal]);


  function handleUpload () {
  showModal(
    <CVUploader closeModal={onCancel} setInput={(input: string) => onInputChange({ target: { value: input } } as React.ChangeEvent<HTMLTextAreaElement>)} />
  )

  }

  return (
<form
  onSubmit={onSubmit}
  className="sm:w-full sm:max-w-[500px] gap-4 md:max-w-[700px] flex items-center relative bg-white rounded-full p-4 shadow-md mt-10"
>
  <div className="relative">
    <label htmlFor="file-upload" className="cursor-pointer text-gray-500 hover:text-gray-700">
      <Paperclip className="" />
    </label>
    <input id="file-upload" type="file" className="hidden" onClick={handleUpload} />
  </div>
  
  <div className="relative flex flex-col w-full">
    <textarea
      name="input-field"
      placeholder="Paste your job here"
      onChange={onInputChange}
      value={input}
      className="flex-1 px-4 py-3 w-full rounded-full border border-gray-300 focus:outline-none border-none text-black resize-none overflow-auto h-16 md:h-20"
    />
    
    <button 
      type="submit" 
      className="absolute right-4 bottom-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition w-10 h-10 flex items-center justify-center"
    >
      ➤
    </button>
  </div>
</form>

  );
};

export default ChatInput;
