import React from "react";

export function withBoldText(text) {
  // Split the text using regex to capture the parts between '**'
  const parts = text.split(/\*\*(.*?)\*\*/g);
  
  // Map through the parts and wrap the bold text in <strong>
  return parts.map((part, index) => 
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
  );
}
