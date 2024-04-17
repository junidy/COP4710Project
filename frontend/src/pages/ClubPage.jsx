import { Navbar } from "../components/Navbar/Navbar.jsx";
import ClubFeed from "../components/ClubFeed.jsx";
import { FooterSocial } from "../components/FooterSocial/FooterSocial.jsx";
import { Center } from "@mantine/core";
import CreateClubButton from "../components/CreateClubButton.jsx";
import { getIsAdmin } from "../utils/endpoints.js";
import { useEffect, useState } from "react";

function ClubPage()
{
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        getIsAdmin().then(arr => {setIsAdmin(arr.data.isAdmin); console.log(arr.data.isAdmin)});
    }, [])
    return (
        <div>
            <Navbar></Navbar>
            <ClubFeed></ClubFeed>
            <Center>
                {
                    isAdmin ? <CreateClubButton></CreateClubButton> : null
                }
            </Center>
            <FooterSocial></FooterSocial>
        </div>
    );
}

export default ClubPage;