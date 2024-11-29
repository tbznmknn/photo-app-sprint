// import Image from "next/image";
import getToken from "@/lib/getToken";
import { redirect } from "next/navigation";
export default async function Home() {
  redirect("/photo-share");
  const Token = await getToken();
  console.log("getToken", Token);
  return (
    <div>
      <iframe
        src="https://giphy.com/embed/g01ZnwAUvutuK8GIQn"
        className=""
        allowFullScreen
      ></iframe>
    </div>
  );
}
