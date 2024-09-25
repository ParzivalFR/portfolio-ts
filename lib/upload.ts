import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function uploadMiddleware(request: NextRequest) {
  const form = formidable({
    multiples: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(request as any, async (err, fields, files) => {
      if (err) {
        reject(NextResponse.json({ error: err.message }, { status: 500 }));
      }

      const uploadFile = async (file: formidable.File) => {
        const result = await cloudinary.uploader.upload(file.filepath, {
          transformation: [{ q_auto: true }, { format: "webp" }],
        });
        await fs.unlink(file.filepath);
        return result.secure_url;
      };

      try {
        const mutableFields: Record<string, any> = { ...fields };

        if (files.cover) {
          mutableFields.cover = [
            await uploadFile(files.cover[0] as formidable.File),
          ];
        }
        if (files.images) {
          mutableFields.images = await Promise.all(
            (files.images as formidable.File[]).map((file) => uploadFile(file))
          );
        }

        resolve({ fields: mutableFields, files });
      } catch (error) {
        if (error instanceof Error) {
          reject(NextResponse.json({ error: error.message }, { status: 500 }));
        } else {
          reject(
            NextResponse.json(
              { error: "Une erreur inconnue est survenue" },
              { status: 500 }
            )
          );
        }
      }
    });
  });
}
