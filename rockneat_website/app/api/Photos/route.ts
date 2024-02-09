import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export async function GET() {
    const pb = new PocketBase(process.env.DB_ADDR);
    const records = await pb.collection('Photos').getFullList();
    return NextResponse.json(records);
}