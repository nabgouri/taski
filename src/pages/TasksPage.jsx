import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Header from "../components/Header";
import PageWrapper from "../components/PageWrapper";
import Task from "../components/Task";
import AddTask from "../components/AddTask";
import useFetcher from "../hooks/use-fetcher";

const ENDPOINT = "https://recruter-backend.vercel.app/api/tasks";

export default function TasksPage() {
  const { data: tasks } = useFetcher(ENDPOINT);
  const { firstName } = useAuthUser();
  return (
    <PageWrapper className="px-[100px] pt-[50px]">
      <Header />
      <div className="my-[50px]">
        <h1 className="text-3xl font-bold">
          Welcom, <span className="text-[#007fff]">{firstName}</span>.
        </h1>
        <p>you</p>
      </div>
      <ul>
        {tasks?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
      <AddTask />
    </PageWrapper>
  );
}
