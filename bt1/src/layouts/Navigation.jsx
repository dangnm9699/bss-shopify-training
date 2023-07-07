import { Navigation } from "@shopify/polaris";
import { ArrowLeftMinor, DraftOrdersFilledMajor, HomeMajor } from "@shopify/polaris-icons";

function LayoutNavigation() {

    return (
        <Navigation location="/">
            <Navigation.Section
                items={[
                    {
                        url: "/",
                        label: "Home",
                        icon: ArrowLeftMinor,
                    },
                ]}
            />
            <Navigation.Section
                separator
                items={[
                    {
                        url: "/account",
                        label: "Account",
                        icon: HomeMajor,
                    },
                    {
                        url: "/addresses",
                        label: "Addresses",
                        icon: DraftOrdersFilledMajor,
                    },
                ]}
            />
        </Navigation>
    )
}

export default LayoutNavigation;
