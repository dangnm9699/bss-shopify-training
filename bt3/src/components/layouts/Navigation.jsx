"use client"
import { Navigation } from "@shopify/polaris";
import { ArrowLeftMinor, DraftOrdersFilledMajor, HomeMajor } from "@shopify/polaris-icons";
import { usePathname } from "next/navigation";
function LayoutNavigation() {
    const pathname = usePathname();
    return (
        <Navigation location="/">
            <Navigation.Section
                items={[
                    {
                        url: "/#",
                        label: "Home",
                        icon: ArrowLeftMinor,
                        selected: pathname === "/"
                    },
                ]}
            />
            <Navigation.Section
                title="Exercise 3"
                separator
                items={[
                    {
                        url: "/account",
                        label: "Account",
                        icon: HomeMajor,
                        selected: pathname === "/account"
                    },
                    {
                        url: "/addresses",
                        label: "Addresses",
                        icon: DraftOrdersFilledMajor,
                        selected: pathname === "/addresses"
                    },
                ]}
            />
        </Navigation>
    )
}

export default LayoutNavigation;
