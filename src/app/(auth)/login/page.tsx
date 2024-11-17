import { Metadata } from "next";
export const metadata: Metadata = { title: "login" };
import LoginRegister from "./LoginRegister";
export default function Page() {
  return <LoginRegister isLogin={true} />;
}
