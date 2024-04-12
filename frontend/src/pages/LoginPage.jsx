import { AuthenticationTitle } from "../components/AuthenticationTitle/AuthenticationTitle";
import { Navbar } from "../components/Navbar/Navbar";
import { FooterSocial } from "../components/FooterSocial/FooterSocial";

function LoginPage()
{
    return (
        <div>
            <Navbar></Navbar>
            <AuthenticationTitle></AuthenticationTitle>
            <FooterSocial></FooterSocial>
        </div>
    );
}

export default LoginPage;