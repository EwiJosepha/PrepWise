import Image from "next/image";
import defaultAvatar from "@/assets/images/avatar.png";
import prepAvatar from "@/assets/images/prep-avatar.jpg";
import { extractQuestions } from "@/utils/extract-question";

const ChatMessage = ({ message, onQuestionClick }: { message: any; onQuestionClick: (question: string) => void }) => {
  return (
    <div className={`chat-line ${message.role === "user" ? "user-chat" : "ai-chat"}`}>
      <Image
        className="avatar"
        alt="avatar"
        width={40}
        height={40}
        src={message.role === "user" ? defaultAvatar : prepAvatar}
      />
      <div style={{ width: "100%", marginLeft: "16px" }}>
        <div className="message text-white leading-6">
          {message.role === "assistant" ? (
            <>
              <p className="leading-6">{message.content}</p>
              {extractQuestions(message.content).length > 0 && (
                <div className="question-suggestions leading-8">
                  {message.content.split("?").map((part:any, i: any) => (
                    <span
                      key={i}
                      onClick={() => onQuestionClick(part + (i < message.content.split("?").length - 1 ? "?" : ""))}
                      className="cursor-pointer text-blue-400 hover:underline block"
                    >
                      {part.trim()}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            message.content
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
