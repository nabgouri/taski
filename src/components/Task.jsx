import Button from "./Button";
import deleteButton from "../assets/delete.svg";
import editButton from "../assets/edit.svg";
import checkCircle from "../assets/CheckCircle.svg";
import { useState } from "react";
import Modal from "./Modal";
import checkMark from "../assets/Checkmark.svg";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useSubmit from "../hooks/use-submit";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useFetcher from "../hooks/use-fetcher";
import { toast } from "react-toastify";

const TASKS_ENDPOINT = "https://recruter-backend.vercel.app/api/tasks";
export default function Task({ task }) {
  const [isOpen, setIsOpen] = useState(false);
  const { title, description, assignedTo, id, status } = task;
  console.log(task);

  const authHeader = useAuthHeader();
  const handleEditTask = useSubmit();
  const { role } = useAuthUser();
  const { mutate: mutateTasks } = useFetcher(TASKS_ENDPOINT);
  async function handleDleteTask() {
    try {
      const response = await fetch(`${TASKS_ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to delete task");
        return;
      }

      await response.json();
      toast.success("Task deleted successfully");
      mutateTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Network error. Please try again later.");
    }
  }
  function handleCompleteTask(e) {
    handleEditTask(
      e,
      `${TASKS_ENDPOINT}/${id}`,
      "PUT",
      { ...task, status: "done" },
      () => {
        mutateTasks();
        toast.success("Task marked as complete!");
      }
    );
  }
  const lineThrough = status === "done" ? "line-through" : null;
  return (
    <li className="bg-[#F5F7F9] px-5 py-4 flex justify-between items-center rounded-2xl task ">
      {status === "done" && (
        <img className="pr-2.5" src={checkMark} alt="check mark icon" />
      )}
      <div className="flex-grow">
        {role === "admin" && (
          <span className="text-[#007FFF] text-sm ">@{assignedTo}</span>
        )}
        <h2 className={`text-lg font-semibold mt-2  ${lineThrough}`}>
          {title}
        </h2>
        <p className={`text-sm text-[#8D9CB8] mt-2 ${lineThrough}`}>
          {description}
        </p>
      </div>
      <div className=" items-center task-action hidden ">
        {status === "in_progress" && (
          <button
            className="p-4 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <img src={editButton} alt="edit button" />
          </button>
        )}
        {role === "admin" && (
          <button className="px-4 py-[7px] cursor-pointer ">
            <img
              src={deleteButton}
              alt="delete Button "
              onClick={handleDleteTask}
            />
          </button>
        )}
        {status === "in_progress" && (
          <Button onClick={handleCompleteTask} className="px-4 flex gap-2 ">
            <img src={checkCircle} alt="check icon" />
            Done
          </Button>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          task={task}
          modalAction="edit"
        />
      )}
    </li>
  );
}
