import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authMiddleware(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      throw new Error(
        "👀 Hop Hop Hop ! Il manque le token d'authentification, jeune Padawan..."
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error(
        "👀 Hop Hop Hop ! Le token d'authentification semble être vide, jeune Padawan..."
      );
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId: string };
    if (!decodedToken.userId) {
      throw new Error(
        "👀 Hop Hop Hop ! Le token d'authentification est invalide, jeune Padawan..."
      );
    }

    // Ajouter l'userId à la requête
    (request as any).userId = decodedToken.userId;

    return request;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Une erreur inconnue est survenue" },
      { status: 401 }
    );
  }
}
