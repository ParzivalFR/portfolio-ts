"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToken } from "@/hooks/token-context";
import { Divider } from "@mui/material";
import ky from "ky";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface AuthResponse {
  token: string;
  userId: string;
}

const Login = () => {
  const { token, login } = useToken();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      setDisabled(false);
    }
  }, [token]);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: AuthResponse = await ky
        .post(`${process.env.NEXT_PUBLIC_HOST}/api/users/signup`, {
          json: { email, password },
        })
        .json();
      login(response.token, response.userId);
      Swal.fire({
        icon: "success",
        title: "Inscription réussie !",
        text: "Vous êtes inscrit avec succès, vous pouvez maintenant vous connecter.",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur d'inscription !",
        text: `Vous n'avez pas pu vous inscrire: ${error}.`,
      });
    }
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: AuthResponse = await ky
        .post(`${process.env.NEXT_PUBLIC_HOST}/api/users/login`, {
          json: { email, password },
        })
        .json();
      login(response.token, response.userId);
      Swal.fire({
        icon: "success",
        title: "Connexion réussie",
        text: "Vous êtes connecté",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur de connexion !",
        text: `Email ou mot de passe incorrect: ${error}.`,
      });
    }
    setEmail("");
    setPassword("");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <main className="flex flex-col justify-center items-center gap-10 w-full min-h-svh">
      <Header />
      <section className="flex flex-col justify-center items-center h-full w-full">
        <Tabs defaultValue="Connexion" className="w-4/5 md:w-[400px]">
          <TabsList className="grid w-full grid-cols-2 border border-foreground/10">
            <TabsTrigger value="Connexion">Connexion</TabsTrigger>
            <TabsTrigger value="Inscription">Inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="Connexion">
            <form
              onSubmit={handleLogin}
              className="w-full m-auto flex flex-col items-center gap-10 bg-background/60 p-6 rounded-lg shadow-pxl border border-foreground/20"
            >
              <div className="w-full flex flex-col gap-2 ">
                <h1 className="text-3xl text-center">Connexion</h1>
                <p className="text-xs italic text-center">
                  Connectez-vous pour accéder à votre espace personnel.
                </p>
              </div>
              <Divider className="w-4/5 bg-primary rounded m-auto" />
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="email">
                  <span className="text-red-600">*</span> Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  className="bg-secondary text-current"
                  aria-placeholder="Email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
                <Label htmlFor="password">
                  <span className="text-red-600">*</span> Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  className="bg-secondary text-current"
                  aria-placeholder="Mot de passe"
                  placeholder="Mot de passe"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              <Button type="submit" className="w-[100px] m-auto">
                Connexion
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="Inscription">
            <form
              onSubmit={handleRegister}
              className="w-full m-auto flex flex-col items-center gap-10 bg-background/60 p-6 rounded-lg shadow-pxl border border-foreground/20"
            >
              <div className="w-full flex flex-col gap-2 ">
                <h1 className="text-3xl text-center">Inscription</h1>
                <p className="text-xs italic text-center">
                  Rentrez vos informations pour vous inscrire.
                </p>
              </div>
              <Divider className="w-4/5 bg-primary rounded m-auto" />
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="email">
                  <span className="text-red-600">*</span> Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  className="bg-secondary text-current"
                  aria-placeholder="Email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
                <Label htmlFor="password">
                  <span className="text-red-600">*</span> Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  className="bg-secondary text-current"
                  aria-placeholder="Mot de passe"
                  placeholder="Mot de passe"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <Button
                type="submit"
                className="w-[100px] m-auto"
                disabled={disabled}
              >
                Inscription
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </section>
      <Footer />
    </main>
  );
};

export default Login;
