import React from "react";

function Footer() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const footerCopy = "Copyright ©️ " + currentYear + " Bryan Butz";

    return(<footer className="footer">{[footerCopy]}</footer>);
}

export default Footer;