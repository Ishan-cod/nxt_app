import React from "react";

export function Scrollable_MSG_AREA({ children }) {
    return (
        <div className="flex-1 overflow-hidden min-h-0">
            <div
                className="h-full overflow-y-auto"
                style={{
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none", // IE/Edge
                }}
            >
                {children}
            </div>
        </div>
    );
}
