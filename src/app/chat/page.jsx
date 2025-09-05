"use client";
import { Droplet } from "lucide-react";
import Image from "next/image";
import Link from "next/navigation";
import React, { useState } from "react";
import { PromptBoxDemo } from "../bot_component/chatfrontend";
import { PromptBox } from "@/components/chatgpt-prompt-input";
import { Mic } from "lucide-react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import { Mic2 } from "lucide-react";
import { Scrollable_MSG_AREA } from "../bot_component/ScrollMessageArea";
import AI_Message from "../bot_component/AiMessage";
import Human_message from "../bot_component/HumanMessage";
import axios from "axios";

const messages = [
  { sender: "ai", message: "hi" },
  { sender: "human", message: "hello!" },
  { sender: "ai", message: "How are you doing today?" },
  { sender: "human", message: "I'm good, just working on a project." },
  {
    sender: "ai",
    message: `Life is a journey filled with constant learning, growth, and opportunities to evolve. Each day brings with it a fresh chance to explore new ideas, develop new skills, and take one step closer to the person you aspire to be. The key lies in embracing both success and failure with the same spirit—viewing achievements as milestones and setbacks as lessons. No one ever grows in complete comfort; progress demands effort, persistence, and the courage to face challenges head-on.\n

In today’s fast-paced world, it is easy to get overwhelmed by distractions, comparison, and the pressure to achieve quickly. But real success is not about racing against time—it’s about consistency, patience, and staying committed to your purpose. Every small action, when repeated daily, creates lasting impact. Just like drops of water can carve stone, discipline and determination shape destiny.

Surround yourself with positivity, keep learning, and never hesitate to ask questions. Curiosity is the driving force behind innovation and creativity. Most importantly, remember to pause and reflect on how far you have come; gratitude fuels motivation. The best way forward is to combine ambition with balance—working hard while also nurturing health, relationships, and inner peace.`,
  },
  { sender: "human", message: "A chatbot for my college assignment." },
  {
    sender: "ai",
    message: "Nice! Do you want me to help you with ideas or code?",
  },
  { sender: "human", message: "Yes, some help with code would be great." },
  {
    sender: "ai",
    message: "Cool, I can provide you with a sample structure to get started.",
  },
];

export default function Page() {
  const [MessageArray, setMessageArray] = useState([]);
  const [input, setinput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return; // Don't send empty messages

    try {
      const messageToSend = input;
      setinput("");
      const humanres = { sender: "human", response: input };
      setMessageArray((prev) => [...prev, humanres]);

      const response = await axios.post("/api/chat", {
        user_query: messageToSend,
        history_chat: MessageArray,
      });

    //   console.log(MessageArray);
      const airesponse = response.data.ai_answer;

      const airesponsed = { sender: "ai", response: airesponse };
      setMessageArray((prev) => [...prev, airesponsed]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="shadow sticky z-50 top-0">
          <nav className="bg-violet-100 border-gray-200 w-full p-1">
            <div className="flex items-center">
              <div className="flex items-center min-w-3xs">
                <Image src={"/Logo.png"} width={40} height={30} />
                <div className="mx-1">
                  <div className="text-sm font-sans font-medium">
                    Central Ground Water Board
                  </div>
                  <div className="text-[9px] font-sans">
                    Department of WR,RD & GR
                  </div>
                  <div className="text-[9px] font-sans">
                    Ministry of Jal Shakti, Government of India
                  </div>
                </div>
              </div>
              <div className="w-full items-center">
                <div className="flex flex-col items-center w-full">
                  <div className="text-lg font-sans font-semibold">
                    NEER MITRA
                  </div>
                  <div>{"(backed by INGRES database)"}</div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* Chat container fills leftover height */}
        <div className="flex-1 flex justify-center overflow-hidden">
          <div className="max-w-3xl w-full flex flex-col">
            {/* Messages area (takes leftover space) */}
            {MessageArray.length === 0 ? (
              <div className="flex-1 overflow-y-auto">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center w-full">
                    <div className="text-4xl font-mono font-bold">
                      Namaskar!
                    </div>
                    <div className="text-3xl font-">
                      Your{" "}
                      <span className="text-blue-600 font-bold">NeerMitra</span>{" "}
                      is here to help you
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Scrollable_MSG_AREA>
                {MessageArray.map((msgObj, i) =>
                  msgObj.sender == "ai" ? (
                    <AI_Message message={msgObj.response} key={i} />
                  ) : (
                    <Human_message message={msgObj.response} key={i} />
                  )
                )}
              </Scrollable_MSG_AREA>
            )}

            {/* Input - Fixed at bottom */}
            <div className="p-4 bg-white border-t flex-shrink-0">
              <div className="p-1 bg-zinc-100 shadow-zinc-200 shadow-lg rounded-lg flex w-full items-center">
                <input
                  type="text"
                  placeholder="We are ready, throw your query!"
                  className="w-full p-2 rounded-md focus:outline-0"
                  value={input}
                  onChange={(e) => setinput(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <div className="p-2 rounded-md hover:bg-zinc-200">
                  <Mic />
                </div>
                <div
                  className="p-2 rounded-md hover:bg-zinc-200 cursor-pointer"
                  onClick={handleSend}
                >
                  <SendIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
