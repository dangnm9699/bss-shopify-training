import React from "react";
import { Button, ButtonGroup, FormLayout, Layout, LegacyCard, Page, TextField } from "@shopify/polaris";
import { useField, useForm, useDynamicList } from '@shopify/react-form';

function Account() {
    const emptyAddressFactory = () => ({
        address: "",
        city: "",
    });
    const addressesList = useDynamicList(localStorage.getItem('addresses') ? JSON.parse(localStorage.getItem('addresses')) : [], emptyAddressFactory);
    const {
        fields: { name, email },
        submit,
        submitting,
        dirty,
    } = useForm({
        fields: {
            name: useField(localStorage.getItem('name') || "Nguyen Minh Dang"),
            email: useField(localStorage.getItem('email') || "dangnm@bsscommerce.com"),
        },
        dynamicLists: {
            addressesList
        },
        onSubmit: async (fieldValues) => {
            localStorage.setItem('name', fieldValues.name);
            localStorage.setItem('email', fieldValues.email);
            localStorage.setItem('addresses', JSON.stringify(fieldValues.addressesList));
            window.dispatchEvent(new Event('storage'));
            return { status: 'success', errors: [{ message: 'bad form data' }] };
        },
    });

    return (
        <Page title="Account">
            <Layout>
                <Layout.AnnotatedSection
                    title="Account details"
                    description="Account information"
                >
                    <LegacyCard sectioned>
                        <FormLayout>
                            <TextField autoComplete="off" label="Full name" onChange={name.onChange} value={name.value} />
                            <TextField autoComplete="off" label="Email" onChange={email.onChange} value={email.value} />
                        </FormLayout>
                    </LegacyCard>
                    <LegacyCard sectioned>
                        <FormLayout>
                            {
                                addressesList.fields.map((field, index) => (<React.Fragment key={`address-${index}`}>
                                    <TextField
                                        autoComplete="off"
                                        label={`Address (${index + 1})`}
                                        onChange={field.address.onChange}
                                        value={field.address.value}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        label={`City`}
                                        onChange={field.city.onChange}
                                        value={field.city.value}
                                    />
                                </React.Fragment>))
                            }
                            <ButtonGroup>
                                <Button onClick={() => addressesList.addItem()}>New Address</Button>
                                <Button primary disabled={!dirty} onClick={() => submit()} loading={submitting}>Save</Button>
                            </ButtonGroup>
                        </FormLayout>
                    </LegacyCard>
                </Layout.AnnotatedSection>
            </Layout>
        </Page>
    )
}

export default Account;
