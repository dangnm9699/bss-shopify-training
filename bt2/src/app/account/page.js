'use client'

import React, { useContext, useEffect, useState } from "react";
import { Layout, Page } from "@shopify/polaris";
import AccountForm from "@/components/AccountForm";
import { AccountContext } from "@/components/layouts";

export default function Account() {
    const {account} = useContext(AccountContext);

    return (
        <Page title="Account">
            <Layout>
                <Layout.AnnotatedSection
                    title="Account details"
                    description="Account information"
                >
                    <AccountForm preloadData={account}/>
                </Layout.AnnotatedSection>
            </Layout>
        </Page>
    )
}
