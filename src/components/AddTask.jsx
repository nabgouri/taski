import addButton from "../assets/add.svg";
import { useState } from "react";
import Modal from "./Modal";

export default function AddTask() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-[15px] mt-5 p-[15px]  ">
      <button onClick={() => setIsOpen(true)} className="cursor-pointer">
        <img src={addButton} />
      </button>
      <p className="text-lg text-semibold text-[#8D9CB8]">Add a new Task...</p>
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} modalAction="new" />
      )}
    </div>
  );
}
