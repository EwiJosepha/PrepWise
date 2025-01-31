import { Paperclip } from "lucide-react";

const ChatInput = ({ input, onInputChange, onSubmit }: { input: string; onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => {

  function handleResume () {
    console.log("clicked");
    
  }
  return (
    <form
      onSubmit={onSubmit}
      className="sm:w-full sm:max-w-[500px] gap-4 md:max-w-[700px] flex items-center relative bg-white rounded-full p-4 shadow-md mt-10"
    >
        <div className="relative">
      <label htmlFor="file-upload" className=" cursor-pointer text-gray-500 hover:text-gray-700">
        <Paperclip  className=""/>
      </label>
      <input id="file-upload" type="file" className="hidden" onClick={handleResume} />
      </div>
      <div className=" relative flex flex-col w-full items-center justify-center">
      <input
        name="input-field"
        type="text"
        placeholder="Paste your job here"
        onChange={onInputChange}
        value={input}
        className="flex-1 px-4 py-3 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />

      <button type="submit" className="absolute right-6 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition w-8 h-8">
        ➤
      </button>
      </div>
    </form>
  );
};

export default ChatInput;
