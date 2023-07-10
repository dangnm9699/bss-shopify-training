'use client'

import React from "react";
import { Layout, Page } from "@shopify/polaris";
import AccountForm from "@/components/AccountForm";
import { useSelector } from "react-redux";
import { selectAccount } from "@/store/slices/account";

export default function Account() {
    const {info} = useSelector(selectAccount);

    return (
        <Page title="Account">
            <Layout>
                <Layout.AnnotatedSection
                    title="Account details"
                    description="Account information"
                >
                    <AccountForm preloadData={info}/>
                </Layout.AnnotatedSection>
            </Layout>
        </Page>
    )
}
