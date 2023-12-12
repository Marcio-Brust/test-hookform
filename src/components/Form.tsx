"use client";

import { Input } from "./Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const createUserFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Campo obrigatório.")
      .transform((name) => {
        return name
          .trim()
          .split(" ")
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(" ");
      }),
    lastname: z
      .string()
      .min(1, "Campo obrigatório.")
      .transform((name) => {
        return name
          .trim()
          .split(" ")
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(" ");
      }),
    email: z
      .string()
      .min(1, "Campo obrigatório.")
      .email("E-mail inválido")
      .toLowerCase(),
    password: z.string().min(6, "A senha deve ter no minímo 6 caracteres"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Senha incorreta",
    path: ["confirm_password"],
  });

type createUserFormData = z.infer<typeof createUserFormSchema>;

export const Form = () => {
  const [data, setData] = useState<createUserFormData>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const createUser = (data: createUserFormData) => {
    setData(data);
    reset();
  };

  return (
    <section className="flex flex-col p-5">
      <form
        onSubmit={handleSubmit(createUser)}
        className="bg-gray-500 p-10 rounded-md"
      >
        <Input
          label="Nome"
          id="nome"
          placeholder="Ex: Márcio Wilson"
          {...register("name")}
          text={errors.name && errors.name.message}
        />

        <Input
          label="Sobrenome"
          id="sobrenome"
          placeholder="Ex: Brust Emerencio Filho"
          {...register("lastname")}
          text={errors.lastname && errors.lastname.message}
        />
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="Ex: wilsinhomw79@gmail.com"
          {...register("email")}
          text={errors.email && errors.email.message}
        />
        <Input
          label="Senha"
          id="password"
          type="password"
          placeholder="Mínimo 6 caracteres"
          {...register("password")}
          text={errors.password && errors.password.message}
        />
        <Input
          label="Digite a senha novamente"
          id="confirmpassword"
          type="password"
          placeholder="Mínimo 6 caracteres"
          {...register("confirm_password")}
          text={errors.confirm_password && errors.confirm_password.message}
        />
        <button className="w-full p-2 rounded-md font-bold bg-green-500 hover:bg-green-600">
          Enviar
        </button>
      </form>
      {data.name && (
        <div className="rounded-md p-10 flex flex-col gap-3">
          <p>Nome: {data.name}</p>
          <p>Sobrenome: {data.lastname}</p>
          <p>E-mail: {data.email}</p>
          <p>Senha: {data.password}</p>
          <p>Confirmação de senha: {data.confirm_password}</p>
        </div>
      )}
    </section>
  );
};
