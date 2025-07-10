import { comments } from "../data";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const comment = comments.find(comment => comment.id.toString() === id);
    if (!comment) {
        return Response.json({ error: "Comment not found" }, { status: 404 });
    }   
    return Response.json(comment, {
        headers: { "Content-Type": "application/json" }
    });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const {text} = await request.json();
    const index = comments.findIndex(comment => comment.id.toString() === id);
    if (index === -1) {
        return Response.json({ error: "Comment not found" }, { status: 404 });
    }
    comments[index].text = text;
    return Response.json(comments[index], {
        headers: { "Content-Type": "application/json" }
    });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const index = comments.findIndex(comment => comment.id.toString() === id);
    if (index === -1) {
        return Response.json({ error: "Comment not found" }, { status: 404 });
    }
    comments.splice(index, 1);
    return Response.json({ message: "Comment deleted successfully" }, {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}