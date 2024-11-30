import { Metadata } from "next";
export const metadata: Metadata = { title: "Login" };
import LoginRegister from "./LoginRegister";
export default function Page() {
  return <LoginRegister isLogin={true} />;
}
