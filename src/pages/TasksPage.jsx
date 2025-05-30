import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Header from "../components/Header";
import PageWrapper from "../components/PageWrapper";
import Task from "../components/Task";
import AddTask from "../components/AddTask";
import useSWR from "swr";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
const ENDPOINT = "https://recruter-backend.vercel.app/api/tasks";

export default function TasksPage() {
  const authHeader = useAuthHeader();
  async function fetcher(endpoint) {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    return json;
  }
  const { data: tasks } = useSWR(ENDPOINT, fetcher);
  console.log(tasks);
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
