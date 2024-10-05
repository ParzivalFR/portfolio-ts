import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  const projects = await prisma.project.findMany({
    include: {
      user: true,
    },
  });

  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const uploadToCloudinary = async (file: File) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return new Promise<string>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) reject(error);
            else resolve(result!.secure_url);
          })
          .end(buffer);
      });
    };

    const cover = formData.get("cover") as File;
    const images = formData.getAll("images") as File[];

    if (!cover || images.length === 0) {
      return NextResponse.json(
        { message: "Aucune image envoyée !" },
        { status: 400 }
      );
    }

    const userId = formData.get("userId");
    if (!userId) {
      return NextResponse.json(
        { message: "Aucun utilisateur trouvé !" },
        { status: 400 }
      );
    }

    const coverUrl = await uploadToCloudinary(cover);
    const imageUrls = await Promise.all(images.map(uploadToCloudinary));

    const project = await prisma.project.create({
      data: {
        userId: userId as string,
        title: formData.get("title") as string,
        categories: (formData.get("categories") as string)
          .split(",")
          .map((category) => category.trim()),
        cover: coverUrl,
        images: imageUrls,
        shortDescription: formData.get("shortDescription") as string,
        description: formData.get("description") as string,
        year: parseInt(formData.get("year") as string),
        skills: (formData.get("skills") as string)
          .split(",")
          .map((skill) => skill.trim()),
        url: formData.get("url") as string,
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
