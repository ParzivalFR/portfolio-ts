import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create a new category
export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    const category = await prisma.category.create({
      data: { title },
    });

    return NextResponse.json(
      { message: "Catégorie enregistrée !", category },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de la catégorie:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la catégorie" },
      { status: 400 }
    );
  }
}

// Get all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des catégories" },
      { status: 400 }
    );
  }
}
