"use client"
import { TopBar } from "@shopify/polaris";
import { useContext, useState } from "react";
import { AccountContext } from ".";

function LayoutTopBar() {
    const {account} = useContext(AccountContext);
    const [userMenu, setUserMenu] = useState(false);
    const handleUserMenuToggle = () => {
        setUserMenu((prev) => !prev);
    };

    const userMenuMarkup =
    account.name && account.email ? (
      <TopBar.UserMenu
        name={account.name}
        initials={account.name.charAt(0).toUpperCase()}
        detail={account.email}
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
