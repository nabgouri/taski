import Button from "./Button";
import deleteButton from "../assets/delete.svg";
import editButton from "../assets/edit.svg";
import checkCircle from "../assets/CheckCircle.svg";

export default function Task({ task }) {
  const { title, description } = task;
  return (
    <li className="bg-[#F5F7F9] px-5 py-4 flex justify-between items-center rounded-2xl">
      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-[#8D9CB8] mt-2">{description}</p>
      </div>
      <div className="flex items-center ">
        <button className="p-4 cursor-pointer">
          <img src={editButton} alt="edit button" />
        </button>
        <button className="px-4 py-[7px] cursor-pointer ">
          <img src={deleteButton} alt="delete Button " />
        </button>
        <Button className="px-4 flex gap-2 ">
          <img src={checkCircle} alt="check icon" />
          Done
        </Button>
      </div>
    </li>
  );
}
