import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Vérifiez que l'email et le mot de passe ne sont pas vides
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log(`Tentative de connexion avec un email non trouvé: ${email}`);
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log(`Mot de passe incorrect pour l'email: ${email}`);
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Assurez-vous que JWT_SECRET est défini
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET n'est pas défini");
      return NextResponse.json(
        { error: "Erreur de configuration du serveur" },
        { status: 500 }
      );
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "24h",
    });

    console.log(`Connexion réussie pour l'utilisateur: ${user.id}`);

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
