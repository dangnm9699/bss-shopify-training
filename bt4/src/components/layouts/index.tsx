"use client"
import {
    AppProvider,
    Frame
} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import React, {useEffect } from "react";
import LayoutTopBar from "./Topbar";
import ErrorBoundary from "./ErrorBoundary";
import LayoutNavigation from "./Navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectAccount, setAccount, setStatus } from "@/store/slices/account";

export default function Layout({ children }: { children: React.ReactNode}) {
    const dispatch = useDispatch();
    const { status } = useSelector(selectAccount);

    useEffect(() => {
        if (status === 'loading') {
            fetch('/api').then(res => res.json()).then(data => {
                dispatch(setStatus('idle'));
                dispatch(setAccount(data));
            });
        }
    }, [status, dispatch]);

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
