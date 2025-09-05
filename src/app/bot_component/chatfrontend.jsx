'use client'
import { PromptBox } from "@/components/chatgpt-prompt-input";

export function PromptBoxDemo() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message");
    // In a real app, you would also handle the uploaded file here.
    if (!message && !event.currentTarget.querySelector('img')) {
      return;
    }
    alert(`Message Submitted!`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background dark:bg-[#212121] p-4">
      <div className="w-full max-w-xl flex flex-col gap-10">
          <p className="text-center text-3xl text-foreground">
            How Can I Help You
          </p>
          <PromptBox />
      </div>
    </div>
  );
}