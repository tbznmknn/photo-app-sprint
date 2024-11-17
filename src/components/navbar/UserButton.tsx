"use client";
import { cs142models } from "@/model/photoData";
// import { useSession } from "@/app/(main)/SessionProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react";
// import { logout } from "@/app/(auth)/actions";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";

interface UserButtonProps {
  className?: string;
}
export default function UserButton({ className }: UserButtonProps) {
  const router = useRouter();
  // const { user } = useSession();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const [loading, setLoading] = useState<boolean>(true);
  console.log(parts[1], parts[2]);
  const [user, setUser] = useState<{
    first_name: string;
    last_name: string;
  } | null>(null);
  useEffect(() => {
    if (parts[1] === "photo-share" && parts[2]) {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get(`/user/${parts[2]}`);
          setUser(response.data.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, [pathname, parts]);
  if (parts[1] === "photo-share") {
    return loading ? (
      <div>loading</div>
    ) : user ? (
      <div>
        {user?.first_name} {user?.last_name}
      </div>
    ) : (
      <div>No user</div>
    );
  }

  // const queryClient = useQueryClient();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={"/images/thorfinn.jpg"} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as @radnaa2015</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/1`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 size-4" />
                System default
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 size-4" />
                Light
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 size-4" />
                Dark
                {theme === "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push("/login");
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
