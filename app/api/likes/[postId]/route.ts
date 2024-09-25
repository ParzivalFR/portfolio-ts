import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Create a new like
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userIp =
      request.ip || request.headers.get("x-forwarded-for") || "unknown";

    const existingLike = await prisma.like.findFirst({
      where: {
        userIp: userIp,
        postId: body.postId,
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { message: "Like déjà existant." },
        { status: 400 }
      );
    }

    const like = await prisma.like.create({
      data: {
        userIp: userIp,
        postId: body.postId,
      },
    });

    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du like:", error);
    return NextResponse.json(
      { message: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}

// Get likes for a post
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const likes = await prisma.like.findMany({
      where: { postId: params.postId },
    });

    return NextResponse.json(likes);
  } catch (error) {
    console.error("Erreur lors de la récupération des likes:", error);
    return NextResponse.json(
      { message: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}

// Delete a like
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const userIp =
      request.ip || request.headers.get("x-forwarded-for") || "unknown";

    const like = await prisma.like.findFirst({
      where: {
        userIp: userIp,
        postId: body.postId,
      },
    });

    if (!like) {
      return NextResponse.json(
        { message: "Like non trouvé." },
        { status: 404 }
      );
    }

    await prisma.like.delete({
      where: { id: like.id },
    });

    return NextResponse.json({ message: "Like supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du like:", error);
    return NextResponse.json(
      { message: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
