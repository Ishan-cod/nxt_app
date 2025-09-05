import Image from "next/image";
import React from "react";
export function Navbar() {
  return (
    <>
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
    </>
  );
}
