import addButton from "../assets/add.svg";
import { useState } from "react";
import Modal from "./Modal";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
export default function AddTask() {
  const [isOpen, setIsOpen] = useState(false);
  const authHeader = useAuthHeader;
  async function handleSumbit(event, formData) {
    event.preventDefault();
    try {
      console.log(formData);
      const response = await fetch(
        "https://recruter-backend.vercel.app/api/tasks",
        {
          method: "POST",
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something wrong Happen!");
      }
    } catch {
      throw new Error("Server issue");
    }
  }

  return (
    <div className="flex gap-[15px] mt-5 p-[15px]  ">
      <button onClick={() => setIsOpen(true)} className="cursor-pointer">
        <img src={addButton} />
      </button>
      <p className="text-lg text-semibold text-[#8D9CB8]">Add a new Task...</p>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSumbit={handleSumbit}
      />
    </div>
  );
}
