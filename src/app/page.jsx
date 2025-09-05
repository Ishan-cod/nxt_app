"use client";
import axios from "axios";

import React from "react";
import { useState } from "react";
import { Scrollable_MSG_AREA } from "./bot_component/ScrollMessageArea";
import AI_Message from "./bot_component/AiMessage";
import Human_message from "./bot_component/HumanMessage";
import { Mic } from "lucide-react";
import { SendIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Navbar } from "./bot_component/Header";

export default function Page() {
  const [MessageArray, setMessageArray] = useState([]);
  const [input, setinput] = useState("");
  const [isloading, setisloading] = useState(false);

  const handleSend = async () => {
    setisloading(true);
    if (!input.trim()) return;

    try {
      const messageToSend = input;
      setinput("");
      const humanres = { sender: "human", response: input };
      setMessageArray((prev) => [...prev, humanres]);

      const response = await axios.post("/api/chat", {
        user_query: messageToSend,
        history_chat: MessageArray,
      });
      setisloading(false);
      //   console.log(MessageArray);
      const airesponse = response.data.ai_answer;

      const airesponsed = { sender: "ai", response: airesponse };
      setMessageArray((prev) => [...prev, airesponsed]);
    } catch (error) {
      setisloading(false);
      console.error("Error sending message:", error);
    }
  };

  // useEffect(() => console.log(isloading), [isloading]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />

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
                  msgObj.sender === "ai" ? (
                    <AI_Message key={i} message={msgObj.response} />
                  ) : (
                    <Human_message key={i} message={msgObj.response} />
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
                {isloading ? (
                  <div className="p-2 rounded-md hover:bg-zinc-200 cursor-pointer">
                    <Loader2 className="animate-spin" />
                  </div>
                ) : (
                  <div
                    className="p-2 rounded-md hover:bg-zinc-200 cursor-pointer"
                    onClick={handleSend}
                  >
                    <SendIcon />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
