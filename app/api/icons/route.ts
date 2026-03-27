
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

const ICON_API_KEY = process.env.API_KEY;

export async function GET(request:Request): Promise<NextResponse> {

    // Using String-deconstruction, extract search parameters from the URL
    const {searchParams} = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json({error: "No query provided"}, {status: 400});
    }

    const res = await fetch(
        `https://api.freepik.com/v1/icons?term=${encodeURIComponent(query)}&limit=20`,
        {
            headers: {
                "x-freepik-api-key": ICON_API_KEY!,
                "Accept-Language": "en-US",
                "Accept": "application/json",
            },
        }
    );

    if (res.status !== 200) {
        return NextResponse.json({error: "Failed to fetch data"}, {status: 500});
    }

    const data = await res.json();
    return NextResponse.json(data);
}
