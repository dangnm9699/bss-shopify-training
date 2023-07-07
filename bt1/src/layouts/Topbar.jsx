import { TopBar } from "@shopify/polaris";
import { useEffect, useState } from "react";

function LayoutTopBar() {
    const [name, setName] = useState(localStorage.getItem('name') || "Nguyen Minh Dang");
    const [email, setEmail] = useState(localStorage.getItem('email') || "dangnm@bsscommerce.com");

    const [userMenu, setUserMenu] = useState(false);
    const handleUserMenuToggle = () => {
        setUserMenu((prev) => !prev);
    };

    useEffect(() => {
        window.addEventListener('storage', () => {
            setName(localStorage.getItem('name') || "Nguyen Minh Dang");
            setEmail(localStorage.getItem('email') || "dangnm@bsscommerce.com");
        }, false);
    }, [])

    const userMenuMarkup =
    name && email ? (
      <TopBar.UserMenu
        name={name}
        initials={name.charAt(0).toUpperCase()}
        detail={email}
        open={userMenu}
        onToggle={handleUserMenuToggle}
      />
    ) : null;

    return (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
        />
    )
}

export default LayoutTopBar;
