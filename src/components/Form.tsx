"use client";

import { Input } from "./Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserFormSchema = z.object({
  name: z.string().min(1,"O nome é obrigatório para cadastro"),
  lastname: z.string().min(1,"O sobrenome é obrigatório para cadastro"),
  email: z
    .string()
    .min(1,"O e-mail é obrigatório para cadastro")
    .email("E-mail com formato inválido"),
  password: z.string().min(6, "A senha deve ter no minímo 6 caracteres"),
  confirm_password: z.string(),
});

type createUserFormData = z.infer<typeof createUserFormSchema>;

export const Form = () => {


  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const createUser = (data: createUserFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(createUser)}
      className="bg-gray-500 p-10 rounded-md"
    >
      <Input
        label="Nome"
        id="nome"
        placeholder="Ex: Márcio Wilson"
        {...register("name")}
      />
      {errors.name && errors.name.message}
      <Input
        label="Sobrenome"
        id="sobrenome"
        placeholder="Ex: Brust Emerencio Filho"
        {...register("lastname")}
      />
      <Input
        label="Email"
        id="email"
        type="email"
        placeholder="Ex: wilsinhomw79@gmail.com"
        {...register("email")}
      />
      <Input
        label="Senha"
        id="password"
        type="password"
        placeholder="Mínimo 8 caracteres "
        {...register("password")}
      />
      <Input
        label="Repita a senha"
        id="confirmpassword"
        type="password"
        placeholder="Mínimo 8 caracteres "
        {...register("confirm_password")}
      />
      <button className="w-full p-2 rounded-md font-bold bg-green-500 hover:bg-green-600">
        Enviar
      </button>
    </form>
  );
};
