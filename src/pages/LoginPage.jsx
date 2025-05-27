import Logo from "../components/Logo";
import Button from "../components/Button";
import PageWrapper from "../components/PageWrapper";
import Input from "../components/Input";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {}
  return (
    <PageWrapper>
      <section className="p-[25px] flex items-center justify-center flex-col border-[1px] rounded-3xl border-[#007FFF]">
        <Logo />
        <h1 className="text-[1.75rem] font-semibold text-center mb-[30px] mt-[80px]">
          Login
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input type="email" label="Email" placeholder="leslie@pixsellz.io" value={email} onChange=  />
          <Input
            type="password"
            label="Password"
            name="passowrd"
            placeholder="Enter password"
          />
          <Button>Login</Button>
        </form>
      </section>
    </PageWrapper>
  );
}
