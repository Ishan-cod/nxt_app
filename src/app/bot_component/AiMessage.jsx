import { BotMessageSquareIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import React from "react";

export default function AI_Message({ message }) {
  return (
    <div className="flex w-full my-2">
      <div className="max-w-200 mt-1">
        <div className="text-black self-start p-2 text-sm rounded-lg ml-1 mt-1 font-mono">
          <div className="my-0.5">
            <BotMessageSquareIcon />
          </div>
          {message}
        </div>
      </div>
    </div>
  );
}
