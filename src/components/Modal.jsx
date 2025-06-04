import { DialogBackdrop, Dialog, DialogPanel } from "@headlessui/react";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import useSubmit from "../hooks/use-submit";
import useFetcher from "../hooks/use-fetcher";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { ToastContainer, toast } from "react-toastify";

const TASKS_ENDPOINT = "https://recruter-backend.vercel.app/api/tasks";
export default function Modal({ isOpen, setIsOpen, task, modalAction }) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    assignedTo: task?.assignedTo || "",
    description: task?.description || "",
    status: "in_progress",
  });
  const [formError, setFormError] = useState(null);
  const { role } = useAuthUser();

  const { data: users } = useFetcher(
    role === "admin" ? "https://recruter-backend.vercel.app/api/users" : null
  );

  const { mutate: mutateTasks } = useFetcher(TASKS_ENDPOINT);

  const handleAddTask = useSubmit();
  const handleEditTask = useSubmit();

  async function handleSumbit(event) {
    setFormError(null);

    // Validate form data
    if (!formData.title.trim()) {
      setFormError("Task title is required");
      toast.error("Task title is required");
      return;
    }

    if (role === "admin" && !formData.assignedTo) {
      setFormError("Please assign this task to a user");
      toast.error("Please assign this task to a user");
      return;
    }

    const result =
      modalAction === "new"
        ? await handleAddTask(event, TASKS_ENDPOINT, "POST", formData, () => {
            mutateTasks();
            toast.success("Task created successfully!");
          })
        : await handleEditTask(
            event,
            `${TASKS_ENDPOINT}/${task.id}`,
            "PUT",
            formData,
            () => {
              mutateTasks();
              toast.success("Task updated successfully!");
            }
          );

    if (result && result.success) {
      setIsOpen(false);
    } else if (result && result.error) {
      setFormError(result.error);
    }
  }
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-[#F0F0F0A6]" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="p-5 rounded-[15px]  bg-white drop-shadow-[0_15px_25px_rgba(0,0,0,0.05)]">
          <form
            className="grid grid-cols-2 gap-x-4 gap-y-5"
            onSubmit={(e) => handleSumbit(e, formData)}
          >
            {formError && (
              <div className="col-span-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {formError}
              </div>
            )}
            <Input
              label="Task Title"
              placeholder="What’s in your mind?"
              className={role === "admin" ? null : "col-span-2"}
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            ></Input>
            {role === "admin" && (
              <Input
                label="Assign to"
                value={formData.assignedTo}
                contolTag="select"
                placeholder="Assign to"
                onChange={(e) =>
                  setFormData({ ...formData, assignedTo: e.target.value })
                }
              >
                <option defaultValue>select User</option>
                {users?.map((user, index) => (
                  <option key={index}>{user.username}</option>
                ))}
              </Input>
            )}
            <Input
              label="Description"
              value={formData.description}
              className="col-span-2"
              contolTag="textarea"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
