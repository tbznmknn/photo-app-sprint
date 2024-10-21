import SearchField from "@/components/SearchField";
import UserButton from "@/components/navbar/UserButton";
import Link from "next/link";
import styles from "./Navbar.module.css"; // Import CSS module

export default function Navbar() {
  return (
    <header className={`${styles.header}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          bugbook
        </Link>
        <SearchField />
        <UserButton className={styles.userbutton} />{" "}
      </div>
    </header>
  );
}
