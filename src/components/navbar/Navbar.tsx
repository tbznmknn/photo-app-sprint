import SearchField from "@/components/SearchField";
import UserButton from "@/components/navbar/UserButton";
import Link from "next/link";
import styles from "./Navbar.module.css"; // Import CSS module
import { getSession } from "@/lib/getToken";
import Activities from "./Activities";
export default async function Navbar() {
  const session = await getSession();
  return (
    <header className={`${styles.header}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Radnaabazar Bulgan
        </Link>
        <SearchField />
        <Link href="/photo-share" className={styles.logo}>
          Photo-Share
        </Link>
        <div className={styles.userbutton}>
          <Activities />
          <UserButton loginName={session?.login_name} id={session?.id} />
        </div>
      </div>
    </header>
  );
}
