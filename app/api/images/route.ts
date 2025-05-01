// app/api/images/route.ts
import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor') || undefined;

  const {
    blobs,
    hasMore,
    cursor: nextCursor,
  } = await list({
    limit: 6,
    cursor,
  });

  return NextResponse.json({
    images: blobs,
    nextCursor,
    hasMore,
  });
}
