import { Metadata } from "next";
export const metadata: Metadata = { title: "Register" };
import LoginRegister from "../login/LoginRegister";
export default function Page() {
  return <LoginRegister isLogin={false} />;
}
