import React, { useState } from "react";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className=" mt-3 w-full">
      <button
        className={`flex z-100 justify-between items-center w-full text-left p-4 bg-[#DF8B24] rounded-lg ${
          isOpen ? "rounded-bl-none rounded-br-none" : ""
        }  focus:outline-none capitalize  font-[700px] text-[14px] text-[#FDF8DF]  py-[10px]  cursor-pointer`}
        onClick={onClick}
        style={{ zIndex: 100 }}
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <p className="p-4 -z-100 text-[12px] bg-[#523129B5]/70 text-[#FDF8DF] rounded-bl-lg rounded-br-lg ">
          {content}
        </p>
      )}
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full ">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
