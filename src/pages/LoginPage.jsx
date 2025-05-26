import Logo from "../components/Logo";
import Button from "../components/Button";
import PageWrapper from "../components/PageWrapper";

export default function LoginPage() {
  return (
    <PageWrapper>
      <section className="flex items-center flex-col">
        <Logo />
        <h1>Login</h1>
        <form>
          <input type="email" />
          <input type="password" name="passowrd" />
          <Button>Login</Button>
        </form>
      </section>
    </PageWrapper>
  );
}
