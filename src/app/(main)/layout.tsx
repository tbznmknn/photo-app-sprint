import Navbar from "@/components/navbar/Navbar";
import getToken, { getSession } from "@/lib/getToken";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const SESSION = await getSession();
  console.log("SEssion", SESSION);
  if (!SESSION) {
    redirect("/login");
  }
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
