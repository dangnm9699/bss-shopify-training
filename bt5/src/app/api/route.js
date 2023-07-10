import { NextResponse } from 'next/server'
import fs from 'fs';
import path from 'path';

export const fileHelper = {
    read: (filename) => {
        try {
            return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'db', filename)));
        } catch (e) {
            return { error: e.message || 'Error' };
        }
    },
    write: (filename, data) => {
        try {
            fs.writeFileSync(path.join(process.cwd(), 'src', 'db', filename), JSON.stringify(data, null, 2));
        } catch (e) {
            return { error: e.message || 'Error' };
        }
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const data = fileHelper.read(`${search || 'account'}.json`);
    if (data.error) {
        return NextResponse.json(data, { status: 500 });
    } else {
        return NextResponse.json(data, { status: 200 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        fileHelper.write('account.json', body);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ success: false, message: e.message || 'Internal Server Error' }, { status: 500 });
    }
}
