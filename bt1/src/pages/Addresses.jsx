import { DataTable, Layout, LegacyCard, Page } from "@shopify/polaris";
function Addresses() {
    const addresses = localStorage.getItem("addresses") ? JSON.parse(localStorage.getItem("addresses")) : [];
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
                            rows={addresses.map(address => {
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
