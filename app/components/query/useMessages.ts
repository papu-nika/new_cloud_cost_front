import { useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const API_URL = "http://localhost:8080"; // Golang サーバーの URL

// メッセージ取得関数（SSE によりリスナーとして動作）
async function fetchMessages(): Promise<string[]> {
  const res = await fetch(`${API_URL}/messages`);
  
    const data = await res.json();
    return data.messages || []; // **← ここを修正**
  
//   return res.json();
}

// SSE によるリアルタイム更新
function useSSE() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/events`);

    eventSource.onmessage = (event) => {
      queryClient.setQueryData(["messages"], (old: string[] | undefined) => [
        ...(old || []),
        event.data,
      ]);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient]);
}

// メッセージ取得 Hook
export function useMessages() {
  useSSE();

  return useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    initialData: [],
  });
}

// メッセージ送信 Hook
export function useSendMessage() {
  return useMutation({
    mutationFn: async (message: string) => {
      await fetch(`${API_URL}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        mode: "cors",
        // credentials: "include",
      });
    },
  });
}
