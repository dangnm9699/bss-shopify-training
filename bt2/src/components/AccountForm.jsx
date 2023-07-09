'use client'
import { useField, useForm, useDynamicList } from "@shopify/react-form";
import { ButtonGroup, Button, FormLayout, LegacyCard, TextField } from "@shopify/polaris";
import React, { useContext } from "react";
import { AccountContext } from "./layouts";
export default function AccountForm({ preloadData }) {
    const {refetch, setRefetch} = useContext(AccountContext);

    const emptyAddressFactory = (params) => ({
        address: params?.address || "",
        city: params?.city || "",
    });

    const {
        fields: { name, email },
        submit,
        submitting,
        dirty,
        dynamicLists: { addressesList }
    } = useForm({
        fields: {
            name: useField(preloadData.name),
            email: useField(preloadData.email),
        },
        dynamicLists: {
            addressesList: useDynamicList(preloadData.addresses, emptyAddressFactory),
        },
        onSubmit: async (fieldValues) => {
            await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: fieldValues.name,
                    email: fieldValues.email,
                    addresses: fieldValues.addressesList
                }),
            }).then(res => res.json()).then(data => console.log(data));
            setRefetch('loading');
            return { status: 'success' };
        },
    });

    return (
        <React.Fragment>

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
                        <Button primary disabled={!dirty} onClick={() => submit()} loading={submitting || refetch === 'loading'}>Save</Button>
                    </ButtonGroup>
                </FormLayout>
            </LegacyCard>
        </React.Fragment>

    )
}