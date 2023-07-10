'use client'

import { selectAccount } from "@/store/slices/account";
import { DataTable, Layout, LegacyCard, Page } from "@shopify/polaris";
import { useSelector } from "react-redux";
function Addresses() {
    const {info} = useSelector(selectAccount);

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
                            rows={info.addresses.map(address => {
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
