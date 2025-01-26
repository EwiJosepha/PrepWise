async function fetchStream(userMessage: string) {
  const response = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: userMessage }] }),
  });

  if (!response.body) {
    console.error("Stream body is null!");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let done = false;
  let fullResponse = "";

  while (!done) {
    const { value, done: streamDone } = await reader.read();
    done = streamDone;
    const chunk = decoder.decode(value, { stream: true });
    console.log(chunk);
    fullResponse += chunk;
    // document.getElementById("output").innerText += chunk;
  }

  console.log("Full response:", fullResponse);
}
