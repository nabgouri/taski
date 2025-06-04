import Logo from "../components/Logo";
import Button from "../components/Button";
import PageWrapper from "../components/PageWrapper";
import Input from "../components/Input";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      const data = await response.json();
      if (!response.ok) {
        const errorMessage =
          data.error || "Login failed. Please check your credentials.";
        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }

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
      toast.success("Login successful! Welcome back.");
      navigate("/tasks", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = "Network error. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  return (
    <PageWrapper className="grid place-items-center h-screen ">
      <section className="p-[25px] flex items-center justify-center flex-col border-[1px] rounded-3xl border-[#007FFF] max-w-lg">
        <Logo />
        <h1 className="text-[1.75rem] font-semibold text-center mb-[30px] mt-[80px]">
          Login
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
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
          <Button className=" w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </section>
    </PageWrapper>
  );
}
