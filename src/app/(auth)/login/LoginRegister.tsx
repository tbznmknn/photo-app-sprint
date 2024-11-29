import styles from "./login.module.css";
import { Metadata } from "next";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Link from "next/link";
export const metadata: Metadata = { title: "login" };
import Image from "next/image";
import loginImage from "@/assets/login-image.jpg";
export default function LoginRegister({ isLogin }: { isLogin: boolean }) {
  const urls = {
    login: { url: "/login", p: "Хаягтай юу?", title: "Бүртгүүлэх" },
    register: {
      url: "/register",
      p: "Бүртгэл байхгүй юу?",
      title: "Нэвтрэх",
    },
  };
  const linkSwitch = isLogin ? urls.register : urls.login;
  return (
    <main className={styles.container}>
      <div className={styles.box}>
        <div className={styles.formContainer}>
          <h1 className={styles.heading}>{linkSwitch.title}</h1>
          <div>
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <Link href={linkSwitch.url} className={styles.link}>
              {linkSwitch.p}
            </Link>
          </div>
        </div>
        <Image src={loginImage} alt="Login Image" className={styles.image} />
      </div>
    </main>
  );
}
