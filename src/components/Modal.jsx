import { DialogBackdrop, Dialog, DialogPanel } from "@headlessui/react";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

export default function Modal({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    title: "",
    assigntTo: "",
    description: "",
  });
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-[#F0F0F0A6]" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="p-5 rounded-[15px]  bg-white drop-shadow-[0_15px_25px_rgba(0,0,0,0.05)]">
          <form className="grid grid-cols-2 gap-x-4 gap-y-5">
            <Input
              label="Task Title"
              placeholder="What’s in your mind?"
              type="text"
              value={formData.title}
            ></Input>
            <Input
              label="Assign to"
              value={formData.assigntTo}
              contolTag="select"
              placeholder="Assign to"
            ></Input>
            <Input
              label="Description"
              value={formData.description}
              className="col-span-2"
              contolTag="textarea"
              placeholder="Note: Add relevant details, blockers, or context for this task here."
            ></Input>
            <div className="flex gap-4  col-[2/3] flex-row-reverse">
              <Button>Add Task</Button>
              <button
                type="reset"
                className="bg-[#F5F7F9] text-[#FF5E5E] px-5 py-4 rounded-[15px] cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
