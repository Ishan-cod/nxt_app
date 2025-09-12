import { BotMessageSquareIcon } from "lucide-react";
import { Inter, Poppins } from "next/font/google";
import React from "react";
import ReactMarkdown from "react-markdown";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // choose what you need
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // pick weights you need
});

export default function AI_Message({ message }) {
  return (
    <div className="flex w-full my-2">
      <div className="max-w-200 mt-1">
        <div
          className={`text-black self-start p-2 text-md rounded-lg ml-1 mt-1 ${inter.className} tracking-wide`}
        >
          <div className="my-0.5">
            <BotMessageSquareIcon />
          </div>
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
