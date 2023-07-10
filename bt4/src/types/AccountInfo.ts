export type AccountAddress = {
    address: string;
    city: string;
}

export type AccountInfo = {
    name: string;
    email: string;
    addresses: AccountAddress[];
}
