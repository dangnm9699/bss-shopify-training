'use client'

import { AccountContext } from "@/components/layouts";
import { DataTable, Layout, LegacyCard, Page } from "@shopify/polaris";
import { useContext } from "react";
function Addresses() {
    const {account} = useContext(AccountContext);

    return (
        <Page title="My Addresses">
            <Layout>
                <Layout.AnnotatedSection
                    title="Addresses details"
                >
                    <LegacyCard sectioned>
                        <DataTable
                            columnContentTypes={[
                                'text',
                                'text'
                            ]}
                            headings={[
                                'Address',
                                'City'
                            ]}
                            rows={account.addresses.map(address => {
                                return [address.address, address.city]
                            })}
                        />
                    </LegacyCard>
                </Layout.AnnotatedSection>
            </Layout>
        </Page>
    )
}

export default Addresses;
