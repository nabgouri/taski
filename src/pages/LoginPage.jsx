import Logo from "../components/Logo";
import Button from "../components/Button";
import PageWrapper from "../components/PageWrapper";
import Input from "../components/Input";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const signIn = useSignIn();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://recruter-backend.vercel.app/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: userName,
            password: password,
          }),
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          const json = await response.json();
          setError(json.error);
        }
      }
      const data = await response.json();

      signIn({
        auth: {
          token: data.user.token,
          type: "Bearer",
        },
        userState: {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          role: data.user.role,
          userName: data.user.username,
        },
      });
      navigate("/tasks", { replace: true });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <PageWrapper className="grid place-items-center h-screen ">
      <section className="p-[25px] flex items-center justify-center flex-col border-[1px] rounded-3xl border-[#007FFF]">
        <Logo />
        <h1 className="text-[1.75rem] font-semibold text-center mb-[30px] mt-[80px]">
          Login
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Email"
            placeholder="leslie@pixsellz.io"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <Input
            type="password"
            label="Password"
            name="passowrd"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button className=" w-full">Login</Button>
        </form>
      </section>
    </PageWrapper>
  );
}
