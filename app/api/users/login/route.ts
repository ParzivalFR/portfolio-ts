import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé !" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Mot de passe incorrect !" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    return NextResponse.json(
      {
        userId: user.id,
        token: token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la connexion de l'utilisateur" },
      { status: 500 }
    );
  }
}
