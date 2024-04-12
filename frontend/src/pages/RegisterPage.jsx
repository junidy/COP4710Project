import { RegisterTitle } from "../components/RegisterTitle/RegisterTitle";
import Navbar from "../components/Navbar/Navbar"
import { FooterSocial } from "../components/FooterSocial/FooterSocial";

function RegisterPage()
{
    return (
        <div>
            <Navbar></Navbar>
            <RegisterTitle></RegisterTitle>
            <FooterSocial></FooterSocial>
        </div>
    );
}

export default RegisterPage;