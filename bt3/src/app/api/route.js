import { NextResponse } from 'next/server'
import fs from 'fs';
import path from 'path';

export async function GET() {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'db', 'account.json')));
    return NextResponse.json(data)
}

export async function POST(request) {
    const body = await request.json();
    fs.writeFileSync(path.join(process.cwd(), 'src', 'db', 'account.json'), JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
}
