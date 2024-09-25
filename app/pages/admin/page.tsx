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
import { marked } from "marked";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Swal from "sweetalert2";

interface FormData {
  userId: string;
  title: string;
  categories: string;
  cover: File | null;
  images: File[];
  shortDescription: string;
  description: string;
  year: string;
  skills: string | string[];
  url: string;
  longMaxLength: number;
  shortMaxLength: number;
}

const AddProjectForm: React.FC = () => {
  const router = useRouter();
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
    longMaxLength: 1000,
    shortMaxLength: 200,
  });

  useEffect(() => {
    const localUserId = localStorage.getItem("userId");
    setFormData((prevState) => ({
      ...prevState,
      userId: localUserId || "",
    }));
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const files = fileInput.files;
      if (files) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: name === "images" ? Array.from(files) : files[0],
        }));
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key as keyof FormData])) {
          (formData[key as keyof FormData] as File[]).forEach((file) =>
            formDataToSend.append(key, file)
          );
        } else {
          const value =
            key === "description"
              ? marked(formData[key as keyof FormData] as string)
              : formData[key as keyof FormData];
          formDataToSend.append(key, value as string | Blob);
        }
      }

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token available.");

      const response = await ky
        .post(`${process.env.HOST}/api/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        })
        .json();

      console.log("Projet ajouté avec succès:", response);
      resetForm();

      Swal.fire({
        icon: "success",
        title: "Projet ajouté !",
        text: "Le projet a bien été ajouté avec succès.",
        showConfirmButton: false,
        timer: 2000,
      });
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: `Une erreur est survenue lors de l'ajout du projet: ${
          (error as Error).message
        }`,
        showConfirmButton: false,
        timer: 2000,
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
      longMaxLength: 1000,
      shortMaxLength: 200,
    });
  };

  const renderInputField = (
    name: keyof FormData,
    label: string,
    type: string = "text",
    placeholder: string = "",
    additionalProps: Record<string, unknown> = {}
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
        required
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
          <h1 className="text-3xl text-center">Ajouter un Projet</h1>
          <p className="text-xs italic text-center">
            Remplissez le formulaire pour ajouter un nouveau projet.
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
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="images">Images</Label>
            <Input
              className="lg:pb-14 lg:pt-10 cursor-pointer text-center bg-secondary/50 text-current"
              type="file"
              name="images"
              onChange={handleChange}
              multiple
              required
            />
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
          <ReactMarkdown className="bg-secondary/50 min-h-24 text-current p-2 rounded-lg overflow-auto break-words">
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

export default AddProjectForm;
