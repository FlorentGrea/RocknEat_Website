import { promises as fs } from "fs";
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import path from "path";

export async function GET() {
    const actual_path = path.join(process.cwd(), 'json')
    const file = await fs.readFile(actual_path + "/infosData.json", 'utf8');
    const data = JSON.parse(file)

    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    const user = session?.user;
    if (user) {
        const data = await req.json()
        const updatedData = JSON.stringify(data);
        const actual_path = path.join(process.cwd(), 'json')
        await fs.writeFile(actual_path + "/infosData.json", updatedData);
        return NextResponse.json({ message: 'Data changed' });
    }
    return (
        NextResponse.json({
            message: "You doesn't have the rights to POST"
        }, {
            status: 401,
        })
    )
}