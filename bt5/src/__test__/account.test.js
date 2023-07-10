/**
 * @jest-environment node
 */
import { GET, fileHelper } from "@/app/api/route";
import { NextRequest } from "next/server";

describe('bt5: Read file JSON', () => {
    test('SUCCESS', () => {
        const data = fileHelper.read('account.json');
        expect(typeof data.name).toBe("string");
        expect(typeof data.email).toBe("string");
        expect(typeof data.addresses).toBe("object");
        expect(data.addresses.length).toBeGreaterThanOrEqual(0);
    });

    test('FAILED: No such file or directory', () => {
        const data = fileHelper.read('accounts.json');
        expect(typeof data.error).toBe("string");
        expect(data.error).toContain("no such file or directory");
    });
});

describe('bt5: Write file JSON', () => {
    test('SUCCESS', () => {
        const data = fileHelper.write('account.json', {
            "name": "Dang Nguyen",
            "email": "dangnm@bsscommerce.com",
            "addresses": [
                {
                    "address": "48 Tố Hữu, Viwseen, Viwseen, Viwseen, Viwseen",
                    "city": "Hanoi"
                },
                {
                    "address": "48 Tố Hữu, Viwseen, Viwseen, Viwseen, Viwseen",
                    "city": "Hanoi"
                },
                {
                    "address": "48 Tố Hữu, Viwseen, Viwseen, Viwseen, Viwseen",
                    "city": "Hanoi"
                },
                {
                    "address": "48 Tố Hữu, Viwseen, Viwseen, Viwseen, Viwseen",
                    "city": "Hanoi"
                }
            ]
        });
        expect(data).toBe(undefined);
    });

    test('FAILED: No such file or directory', () => {
        const data = fileHelper.read('accounts.json', 'x');
        expect(typeof data.error).toBe("string");
        expect(data.error).toContain("no such file or directory");
    });
});

describe('bt5: Request info', () => {
    test('SUCCESS', async () => {
        const request = new NextRequest('http://localhost:3000/api?search=account', {
            method: 'GET'
        })
        const res = await GET(request);
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(typeof data.name).toBe("string");
        expect(typeof data.email).toBe("string");
        expect(typeof data.addresses).toBe("object");
        expect(data.addresses.length).toBeGreaterThanOrEqual(0);
    });

    test('FAILED', async () => {
        const request = new NextRequest('http://localhost:3000/api?search=accounts', {
            method: 'GET'
        })
        const res = await GET(request);
        expect(res.status).toBe(500);
        const data = await res.json();
        expect(typeof data.error).toBe("string");
    });
});

