import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET ALL PROJECTS
export async function GET(request: NextRequest) {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des projets" },
      { status: 400 }
    );
  }
}

// CREATE PROJECT
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.cover || !body.images) {
      return NextResponse.json(
        { message: "Aucune image envoyée !" },
        { status: 400 }
      );
    }
    if (!body.userId) {
      return NextResponse.json(
        { message: "Aucun utilisateur trouvé !" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        ...body,
        userId: body.userId,
      },
    });

    return NextResponse.json(
      { message: "Project created!", project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du projet:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du projet" },
      { status: 400 }
    );
  }
}
