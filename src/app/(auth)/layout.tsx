import { getSession } from "@/lib/getToken";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const SESSION = await getSession();

  if (SESSION) redirect("/");
  return <>{children}</>;
}
