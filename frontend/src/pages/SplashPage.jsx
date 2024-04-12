import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { HeroImageBackground } from "../components/HeroImageBackground/HeroImageBackground";
import { FooterSocial } from "../components/FooterSocial/FooterSocial";

/* 
GENERAL LAYOUT OF THIS PAGE:
* Navbar
  * Link to login/register
* Hero
  * Big UCF logo or something
* Blurb of info
  * ChatGPT generated blurb of what the site is
*/

function SplashPage() {
  return <>
    <Navbar></Navbar>
    <HeroImageBackground></HeroImageBackground>
    <FooterSocial></FooterSocial>
  </>;
}

export default SplashPage;