"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Spacing from "@/components/Spacing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import ky from "ky";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Swal from "sweetalert2";

interface FormData {
  userId: string;
  title: string;
  categories: string;
  cover: File | string | null;
  images: (File | string)[];
  shortDescription: string;
  description: string;
  year: string;
  skills: string | string[];
  url: string;
  deletedImages: string[];
}

const EditProjectForm = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    title: "",
    categories: "",
    cover: null,
    images: [],
    shortDescription: "",
    description: "",
    year: "",
    skills: "",
    url: "",
    deletedImages: [],
  });

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token available.");

        const project = await ky
          .get(`${process.env.NEXT_PUBLIC_HOST}/api/projects/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .json();

        setFormData((prevState) => ({
          ...prevState,
          ...(project as object),
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération du projet:", error);
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: `Une erreur est survenue lors de la récupération du projet: ${
            (error as Error).message
          }`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    };

    fetchProjectData();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const files = fileInput.files;
      if (files) {
        if (name === "images") {
          setFormData((prevState) => ({
            ...prevState,
            images: [...prevState.images, ...Array.from(files)],
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            [name]: files[0],
          }));
        }
      }
    } else if (name === "skills") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value.split(",").map((skill) => skill.trim()),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = (image: File | string) => {
    setFormData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((img) => img !== image),
      deletedImages: [...prevState.deletedImages, image as string],
    }));
  };

  const handleRemoveCover = () => {
    setFormData((prevState) => ({
      ...prevState,
      cover: null,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === "skills" && Array.isArray(formData.skills)) {
          formDataToSend.append("skills", formData.skills.join(","));
        } else if (Array.isArray(formData[key as keyof FormData])) {
          (formData[key as keyof FormData] as Array<any>).forEach((item) => {
            if (item instanceof File) {
              formDataToSend.append(key, item);
            } else {
              formDataToSend.append(key, item.toString());
            }
          });
        } else if (formData[key as keyof FormData] instanceof File) {
          formDataToSend.append(key, formData[key as keyof FormData] as File);
        } else if (formData[key as keyof FormData] !== null) {
          formDataToSend.append(
            key,
            formData[key as keyof FormData]!.toString()
          );
        }
      }

      formDataToSend.append(
        "deletedImages",
        JSON.stringify(formData.deletedImages)
      );

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token available.");

      const response = await ky
        .put(`${process.env.NEXT_PUBLIC_HOST}/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        })
        .json();

      console.log("Projet mis à jour avec succès:", response);
      Swal.fire({
        icon: "success",
        title: "Projet mis à jour !",
        text: "Le projet a bien été mis à jour avec succès.",
        showConfirmButton: false,
        timer: 2000,
      });
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du projet:", error);
      let errorMessage = "Une erreur inconnue est survenue.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: `Une erreur est survenue lors de la mise à jour du projet: ${errorMessage}`,
        showConfirmButton: true,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      userId: formData.userId,
      title: "",
      categories: "",
      cover: null,
      images: [],
      shortDescription: "",
      description: "",
      year: "",
      skills: "",
      url: "",
      deletedImages: [],
    });
  };

  const renderInputField = (
    name: keyof FormData,
    label: string,
    type: string = "text",
    placeholder: string = "",
    additionalProps: Record<string, any> = {}
  ) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        className="bg-secondary/50 text-current"
        type={type}
        name={name}
        value={formData[name] as string}
        onChange={handleChange}
        placeholder={placeholder}
        {...additionalProps}
      />
    </div>
  );

  const renderTextareaField = (
    name: keyof FormData,
    label: string,
    placeholder: string = "",
    maxLength?: number
  ) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        className="bg-secondary/50 text-current"
        name={name}
        value={formData[name] as string}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );

  return (
    <>
      <Header />
      <Spacing size={50} />
      <form
        onSubmit={handleSubmit}
        className="w-4/5 sm:w-3/5 md:w-3/5 lg:w-3/5 m-auto flex flex-col gap-4 bg-background/60 p-6 rounded-lg shadow-pxl"
      >
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-3xl text-center">Modifier un Projet</h1>
          <p className="text-xs italic text-center">
            Modifiez les champs pour mettre à jour le projet.
          </p>
        </div>
        <Spacing size={20} />
        <Separator className="w-4/5 lg:w-3/5 h-px m-auto bg-primary rounded" />
        <Spacing size={40} />
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-10">
          {renderInputField("title", "Titre", "text", "Titre du projet", {
            required: true,
          })}
          <div className="flex flex-col gap-2">
            <Label htmlFor="categories">Catégorie</Label>
            <select
              name="categories"
              id="categories"
              value={formData.categories}
              onChange={handleChange}
              className="bg-secondary/50 text-sm text-current rounded-lg p-2 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary/90 focus:ring-opacity-50"
              required
            >
              <option value="" disabled>
                Sélectionner la catégorie...
              </option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
              <option value="Optimisation">Optimisation</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 text-center lg:grid lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cover" className="truncate">
              Image de couverture
            </Label>
            <Input
              className="lg:pb-14 lg:pt-10 cursor-pointer text-center bg-secondary/50 text-current"
              type="file"
              name="cover"
              onChange={handleChange}
            />
            <div className="flex rounded-sm overflow-hidden gap-2 mt-2">
              {formData.cover && (
                <div className="relative rounded-sm overflow-hidden">
                  <img
                    src={
                      formData.cover instanceof File
                        ? URL.createObjectURL(formData.cover)
                        : formData.cover
                    }
                    alt="Cover"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 px-2 bg-red-500 text-white text-sm rounded"
                    onClick={() => handleRemoveCover()}
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="images">Images</Label>
            <Input
              className="lg:pb-14 lg:pt-10 cursor-pointer text-center bg-secondary/50 text-current"
              type="file"
              name="images"
              onChange={handleChange}
              multiple
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-2 mt-2">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-sm overflow-hidden"
                >
                  <img
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt={`Image ${index + 1}`}
                    className="object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 px-2 bg-red-500 text-white text-sm rounded"
                    onClick={() => handleRemoveImage(image)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {renderTextareaField(
          "shortDescription",
          "Description courte",
          "Description du projet (courte)",
          200
        )}
        {renderTextareaField(
          "description",
          "Description",
          "Description du projet (longue)",
          5000
        )}
        <div className="flex flex-col gap-2">
          <Label htmlFor="year">Prévisualisation</Label>
          <ReactMarkdown className="bg-secondary/50 min-h-24 text-current p-2 rounded-lg">
            {formData.description}
          </ReactMarkdown>
        </div>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-10">
          {renderInputField(
            "year",
            "Année de création",
            "number",
            "Année de création",
            { required: true }
          )}
          {renderInputField(
            "skills",
            "Compétences",
            "text",
            "Skills utilisés (Séparés par des virgules)",
            { required: true }
          )}
        </div>
        {renderInputField("url", "URL", "text", "Lien du projet", {
          required: true,
        })}
        <Spacing size={10} />
        <Separator className="w-4/5 lg:w-3/5 h-[0.5px] m-auto bg-primary rounded" />
        <Spacing size={5} />
        <Button type="submit" className="w-[100px] lg:w-2/5 m-auto">
          Soumettre
        </Button>
      </form>
      <Spacing size={100} />
      <Footer />
    </>
  );
};

export default EditProjectForm;
