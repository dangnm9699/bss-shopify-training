import {
    AppProvider,
    Frame
} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import React from "react";
import LayoutTopBar from "./Topbar";
import ErrorBoundary from "./ErrorBoundary";
import LayoutNavigation from "./Navigation";

function Layout({ children }) {
    return (
        <ErrorBoundary>
            <AppProvider i18n={en}>
                <Frame
                    topBar={<LayoutTopBar />}
                    navigation={<LayoutNavigation />}
                >
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                </Frame>
            </AppProvider>
        </ErrorBoundary>
    )
}

export default Layout;
