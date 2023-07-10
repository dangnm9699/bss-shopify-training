import { Navigation } from "@shopify/polaris";
import { ArrowLeftMinor, DraftOrdersFilledMajor, HomeMajor } from "@shopify/polaris-icons";

function LayoutNavigation() {

    return (
        <Navigation location="/">
            <Navigation.Section
                items={[
                    {
                        url: "/#",
                        label: "Home",
                        icon: ArrowLeftMinor,
                        selected: window.location.pathname === '/'
                    },
                ]}
            />
            <Navigation.Section
                title="Exercise 1"
                separator
                items={[
                    {
                        url: "/account",
                        label: "Account",
                        icon: HomeMajor,
                        selected: window.location.pathname === '/account'
                    },
                    {
                        url: "/addresses",
                        label: "Addresses",
                        icon: DraftOrdersFilledMajor,
                        selected: window.location.pathname === '/addresses'
                    },
                ]}
            />
        </Navigation>
    )
}

export default LayoutNavigation;
