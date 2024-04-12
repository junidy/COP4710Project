import { Navbar } from "../components/Navbar/Navbar.jsx";
import ClubFeed from "../components/ClubFeed.jsx";
import { FooterSocial } from "../components/FooterSocial/FooterSocial.jsx";
import { Center } from "@mantine/core";
import CreateClubButton from "../components/CreateClubButton.jsx";

function ClubPage()
{
    return (
        <div>
            <Navbar></Navbar>
            <ClubFeed></ClubFeed>
            <Center>
                <CreateClubButton></CreateClubButton>
            </Center>
            <FooterSocial></FooterSocial>
        </div>
    );
}

export default ClubPage;