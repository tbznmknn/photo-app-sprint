import SearchField from "@/components/SearchField";
import UserButton from "@/components/navbar/UserButton";
import Link from "next/link";
import styles from "./Navbar.module.css"; // Import CSS module
export default function Navbar() {
  return (
    <header className={`${styles.header}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Radnaabazar Bulgan
        </Link>
        <SearchField />
        <Link href="/photo-share/hi" className={styles.logo}>
          Photo-Share
        </Link>
        <UserButton className={styles.userbutton} />{" "}
      </div>
    </header>
  );
}
