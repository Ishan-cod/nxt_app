
import React from "react";

export default function Human_message({ message }) {
  return (
    <div className="w-full flex justify-end">
      <div className="max-w-75 mt-1">
        <div className="bg-zinc-300 text-black self-end p-2 text-[13px] rounded-md mt-1 mr-1 font-sans">
          {message}
        </div>
      </div>
    </div>
  );
}
