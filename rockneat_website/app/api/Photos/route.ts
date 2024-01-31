import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';
import { getSession } from '@auth0/nextjs-auth0';

export async function GET() {
    const pb = new PocketBase(process.env.DB_ADDR);
    const records = await pb.collection('Photos').getFullList({
        cache: 'no-store' 
    });
    return NextResponse.json(records);
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    const user = session?.user;
    if (user) {
        const pb = new PocketBase(process.env.DB_ADDR);
        const data = await req.formData()
        const record = await pb.collection('Photos').create(data);
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

export async function PATCH(req: NextRequest) {
    const session = await getSession();
    const user = session?.user;
    if (user) {
        const pb = new PocketBase(process.env.DB_ADDR);
        const data = await req.formData()
        const record = await pb.collection('Photos').update(data.get('id') as string, data);
        return NextResponse.json(record);
    }
    return (
        NextResponse.json({
            message: "You doesn't have the rights to PATCH"
          }, {
            status: 401,
          })
    )
}

export async function DELETE(req: NextRequest) {
    const session = await getSession();
    const user = session?.user;
    if (user) {
        const pb = new PocketBase(process.env.DB_ADDR);
        const data = await req.json()
        const record = await pb.collection('Photos').delete(data.id);
        return NextResponse.json(record);
    }
    return (
        NextResponse.json({
            message: "You doesn't have the rights to DELETE"
          }, {
            status: 401,
          })
    )
}