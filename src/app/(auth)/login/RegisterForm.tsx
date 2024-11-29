"use client";

import { signUpSchema, SignUpValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
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
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function onSubmit(values: SignUpValues) {
    setError(undefined);
    console.log(values);

    startTransition(async () => {
      try {
        const data = {
          login_name: values.username,
          password: values.password,
          first_name: values.first_name,
          last_name: values.last_name,
          occupation: values.occupation,
          description: values.description,
          location: values.location,
        };
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(([key, value]) => value !== null)
        );
        const response = await axiosInstance.post("/user", filteredData);
        console.log(response.data.data); // Handle successful response data
        router.push("/login");
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
                <Input placeholder="Нэвтрэх нэр" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div style={{ marginBottom: "1rem" }}></div>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Нэр</FormLabel>
              <FormControl>
                <Input placeholder="Нэр" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div style={{ marginBottom: "1rem" }}></div>
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Овог</FormLabel>
              <FormControl>
                <Input placeholder="Овог" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div style={{ marginBottom: "1rem" }}></div>
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Мэргэжил</FormLabel>
              <FormControl>
                <Input placeholder="Мэргэжил" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div style={{ marginBottom: "1rem" }}></div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Газрын хаяг</FormLabel>
              <FormControl>
                <Input placeholder="Газрын хаяг" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div style={{ marginBottom: "1rem" }}></div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Нэмэлт мэдээлэл</FormLabel>
              <FormControl>
                <Input placeholder="Нэмэлт мэдээлэл" {...field} />
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
                <PasswordInput placeholder="Нууц үг" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div style={{ marginBottom: "1rem" }}></div>
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Нууц үг давтах</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Нууц үг" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div style={{ marginBottom: "1rem" }}></div>
        <LoadingButton
          loading={isPending}
          type="submit"
          style={{ width: "100%" }}
        >
          Бүртгүүлэх
        </LoadingButton>
      </form>
    </Form>
  );
}
