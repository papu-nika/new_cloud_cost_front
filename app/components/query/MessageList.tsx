import { useState } from "react";
import { useMessages, useSendMessage } from "./useMessages";

export function MessageList() {
  const { data: messages, isLoading, error } = useMessages();
  const sendMessageMutation = useSendMessage();
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    await sendMessageMutation.mutateAsync(input);
    setInput("");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading messages</p>;

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages?.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a message..."
      />
      <button onClick={sendMessage}
       disabled={sendMessageMutation.status === 'loading'}>
        {sendMessageMutation.status === 'loading' ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
