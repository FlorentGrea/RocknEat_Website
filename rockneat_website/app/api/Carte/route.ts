import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import PocketBase from 'pocketbase';

export async function GET() {
    const pb = new PocketBase(process.env.DB_ADDR);
    const record = await pb.collection('Jsons').getOne('emip3npy7ntnwse')
    const data = JSON.parse(JSON.stringify(record.json_file))

    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const pb = new PocketBase(process.env.DB_ADDR);
    const session = await getSession();
    const user = session?.user;

    if (user) {
        const post_data = {
            "json_name": 'carteData',
            "json_file": await req.json()
        }
        const record = await pb.collection('Jsons').update('emip3npy7ntnwse', post_data);
        return NextResponse.json(record);
    }
    return (
        NextResponse.json({
            message: "You doesn't have the rights to POST"
        }, {
            status: 401,
        })
    )
}