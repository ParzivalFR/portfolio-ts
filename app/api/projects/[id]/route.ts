import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get one project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });
    if (!project) {
      return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error("Erreur lors de la récupération du projet:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du projet" },
      { status: 404 }
    );
  }
}

// Delete One Project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });
    }

    if (body.userId !== project.userId) {
      return NextResponse.json({ message: "Accès refusé !" }, { status: 403 });
    }

    const deleteImage = async (publicId: string) => {
      await cloudinary.uploader.destroy(publicId);
    };

    const coverPublicId = project.cover.split("/").pop()?.split(".")[0];
    if (coverPublicId) await deleteImage(coverPublicId);

    for (const image of project.images) {
      const imagePublicId = image.split("/").pop()?.split(".")[0];
      if (imagePublicId) await deleteImage(imagePublicId);
    }

    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Project deleted!" });
  } catch (error) {
    console.error("Erreur lors de la suppression du projet:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du projet" },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });
    }

    const userId = formData.get("userId");
    if (userId !== project.userId) {
      return NextResponse.json({ message: "Accès refusé !" }, { status: 403 });
    }

    const currentCover = project.cover;
    const currentImages = project.images;
    const deletedImages = JSON.parse(
      (formData.get("deletedImages") as string) || "[]"
    );

    const uploadToCloudinary = async (file: File) => {
      const buffer = await file.arrayBuffer();
      const base64File = Buffer.from(buffer).toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:${file.type};base64,${base64File}`
      );
      return result.secure_url;
    };

    const deleteFromCloudinary = async (url: string) => {
      const publicId = url.split("/").pop()?.split(".")[0];
      if (publicId) await cloudinary.uploader.destroy(publicId);
    };

    // Handle cover image
    let updatedCover = currentCover;
    const newCover = formData.get("cover") as File;
    if (newCover && newCover instanceof File) {
      updatedCover = await uploadToCloudinary(newCover);
      if (currentCover) await deleteFromCloudinary(currentCover);
    }

    // Handle project images
    let updatedImages = currentImages;
    const newImages = formData.getAll("images") as File[];
    if (newImages.length > 0) {
      const uploadedNewImages = await Promise.all(
        newImages.map(uploadToCloudinary)
      );
      updatedImages = [...currentImages, ...uploadedNewImages];
    }

    // Delete images
    for (const image of deletedImages) {
      await deleteFromCloudinary(image);
      updatedImages = updatedImages.filter((img) => img !== image);
    }

    const updatedProject = await prisma.project.update({
      where: { id: params.id },
      data: {
        title: formData.get("title") as string,
        shortDescription: formData.get("shortDescription") as string,
        description: formData.get("description") as string,
        year: parseInt(formData.get("year") as string),
        skills: (formData.get("skills") as string).split(","),
        url: formData.get("url") as string,
        cover: updatedCover,
        images: updatedImages,
      },
    });

    return NextResponse.json({
      message: "Projet mis à jour !",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du projet:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du projet" },
      { status: 500 }
    );
  }
}
