"use client";

import { loginSchema, LoginValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function onSubmit(values: LoginValues) {
    setError(undefined);
    console.log(values);

    startTransition(async () => {
      try {
        const data = {
          login_name: values.username,
          password: values.password,
        };
        const response = await axiosInstance.post("/admin/login", data);
        console.log(response.data.data); // Handle successful response data

        Cookies.set("TOKEN", response.data.data.token);
        router.refresh();
      } catch (error: any) {
        if (error.response) {
          // Access the error response body
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data); // The error response body
          console.error("Error headers:", error.response.headers);
          setError(error.response?.data?.message);
        }
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {" "}
        {error && (
          <p style={{ textAlign: "center", color: "hsl(var(--destructive))" }}>
            {error}
          </p>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Нэвтрэх нэр</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div style={{ marginBottom: "1rem" }}></div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Нууц үг</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          loading={isPending}
          type="submit"
          style={{ width: "100%", marginTop: "1rem" }}
        >
          Нэвтрэх
        </LoadingButton>
      </form>
    </Form>
  );
}
