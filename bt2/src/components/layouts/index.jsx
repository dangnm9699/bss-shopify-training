"use client"
import {
    AppProvider,
    Frame
} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import React, { createContext, useEffect, useState } from "react";
import LayoutTopBar from "./Topbar";
import ErrorBoundary from "./ErrorBoundary";
import LayoutNavigation from "./Navigation";

export const AccountContext = createContext();

function Layout({ children }) {

    const [account, setAccount] = useState({
        name: "",
        email: "",
        addresses: [],
    });

    const [refetch, setRefetch] = useState('loading');

    useEffect(() => {
        if (refetch === 'loading') {
            fetch('/api').then(res => res.json()).then(data => {
                setAccount(data);
                setRefetch('idle');
            });
        }
    }, [refetch]);

    return (
        <ErrorBoundary>
            <AppProvider i18n={en}>
                <AccountContext.Provider value={{ account, refetch, setRefetch }}>
                    <Frame
                        topBar={<LayoutTopBar />}
                        navigation={<LayoutNavigation />}
                    >
                        <React.Fragment>
                            {children}
                        </React.Fragment>
                    </Frame>
                </AccountContext.Provider>
            </AppProvider>
        </ErrorBoundary>
    )
}

export default Layout;
