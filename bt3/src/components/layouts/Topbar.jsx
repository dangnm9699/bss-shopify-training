"use client"
import { selectAccount } from "@/store/slices/account";
import { TopBar } from "@shopify/polaris";
import {useState } from "react";
import { useSelector } from "react-redux";

function LayoutTopBar() {
    const {info} = useSelector(selectAccount);
    const [userMenu, setUserMenu] = useState(false);
    const handleUserMenuToggle = () => {
        setUserMenu((prev) => !prev);
    };

    const userMenuMarkup =
    info.name && info.email ? (
      <TopBar.UserMenu
        name={info.name}
        initials={info.name.charAt(0).toUpperCase()}
        detail={info.email}
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
