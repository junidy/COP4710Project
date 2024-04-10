import { Outlet, Link } from "react-router-dom";
import RegistrationCard from "../components/RegistrationCard";

function SplashPage() {
  return <>
    <Link to={"events"}>
      To Events
    </Link>
    <RegistrationCard />
  </>;
}

export default SplashPage;