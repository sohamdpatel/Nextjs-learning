import { NextRequest } from "next/server";
import { comments } from "./data";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    let filteredComments = query ? comments.filter(comment => comment.text.toLowerCase().includes(query.toLowerCase())) : comments;

    if (filteredComments.length === 0) {
        return Response.json({ error: "No comments found" }, { status: 404 });
    }
    return Response.json(filteredComments, {
        headers: { "Content-Type": "application/json" }
    }); 
}

export async function POST(request: Request) {
    const newComment = await request.json();
    const newId = comments.length + 1;
    const commentWithId = {  id: newId, ...newComment };
    comments.push(commentWithId);
    return Response.json(JSON.stringify(commentWithId), {
        status: 201,
        headers: { "Content-Type": "application/json" }
    });
}