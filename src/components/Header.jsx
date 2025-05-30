import Logo from "./Logo";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import adminImage from "../assets/admin.png";
import userImage from "../assets/user.png";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const { role, firstName } = useAuthUser();
  const avatarImage = role === "admin" ? adminImage : userImage;
  const signOut = useSignOut();
  const navigate = useNavigate();
  function logOut() {
    signOut();
    navigate("/login");
  }
  return (
    <header className="  flex justify-between items-center">
      <Logo />
      <div className="flex gap-5 items-center ">
        <span className="text-lg font-semi-bold">{firstName}</span>
        <button onClick={() => logOut()}>
          <img src={avatarImage} alt="avatar Image" />
        </button>
      </div>
    </header>
  );
}
