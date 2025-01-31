import ChatMessage from "@/core/dashboard-comp/chat-board/single-msg";

const ChatHistory = ({ messages, onQuestionClick }: { messages: any[]; onQuestionClick: (question: string) => void }) => {
  return (
    <div className="response md:p-[30px] bg-secondary">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} onQuestionClick={onQuestionClick} />
      ))}
    </div>
  );
};

export default ChatHistory;
