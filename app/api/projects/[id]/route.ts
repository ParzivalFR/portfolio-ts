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

// Update a project
export async function PUT(
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

    const currentCover = project.cover;
    const currentImages = project.images;
    const updatedCover = body.cover || currentCover;
    const updatedImages = body.images || currentImages;
    const deletedImages = body.deletedImages || [];

    const deleteImage = async (publicId: string) => {
      await cloudinary.uploader.destroy(publicId);
    };

    if (updatedCover !== currentCover && currentCover) {
      const coverPublicId = currentCover.split("/").pop()?.split(".")[0];
      if (coverPublicId) await deleteImage(coverPublicId);
    }

    for (const image of deletedImages) {
      const imagePublicId = image.split("/").pop()?.split(".")[0];
      if (imagePublicId) await deleteImage(imagePublicId);
    }

    const updatedProject = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...body,
        cover: updatedCover,
        images: updatedImages.filter(
          (image: string) => !deletedImages.includes(image)
        ),
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
      { status: 404 }
    );
  }
}
