import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Header from "../components/Header";
import PageWrapper from "../components/PageWrapper";
import Task from "../components/Task";
import AddTask from "../components/AddTask";
import useFetcher from "../hooks/use-fetcher";

const ENDPOINT = "https://recruter-backend.vercel.app/api/tasks";

export default function TasksPage() {
  const { data: tasks } = useFetcher(ENDPOINT);
  const { firstName, role } = useAuthUser();
  return (
    <PageWrapper className="px-[100px] pt-[50px]">
      <Header />
      <div className="my-[50px]">
        <h1 className="text-3xl font-bold mb-2.5">
          Welcom, <span className="text-[#007fff]">{firstName}</span>.
        </h1>
        <p className="text-lg font-medium text-[#8D9CB8]">
          {role === "admin"
            ? `Your Team got ${tasks?.length ?? "0"} tasks to do.`
            : `You've got ${tasks?.length ?? "0"} tasks to do.`}
        </p>
      </div>
      <ul className="space-y-4">
        {tasks?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
      {role === "admin" && <AddTask />}
    </PageWrapper>
  );
}
