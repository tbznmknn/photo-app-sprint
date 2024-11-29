"use client";

import Image from "next/image";
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

import { RefreshCwIcon, LoaderIcon } from "lucide-react";
// import { logout } from "@/app/(auth)/actions";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";

interface ActivitiesProps {
  className?: string;
}
export default function Activities({ className }: ActivitiesProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [activities, setActivities] = useState<any[]>([]); // Store the fetched activities
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch activities from the backend
    const fetchActivities = async () => {
      try {
        const response = await axiosInstance.get("/admin/activity");
        // console.log(response.data.data);

        setActivities(response.data.data); // Store the activities in state
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("Failed to load activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleRefresh = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.get("/admin/activity");
      setActivities(response.data.data); // Refresh activities
    } catch (err) {
      console.error("Error refreshing activities:", err);
      setError("Failed to refresh activities");
    } finally {
      setLoading(false);
    }
  };

  // const queryClient = useQueryClient();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={"/assets/activity.png"} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[350px]">
        <DropdownMenuLabel>Activities </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {loading ? (
          <div>
            <LoaderIcon />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : activities.length === 0 ? (
          <div>No activities to show</div>
        ) : (
          <div className="space-y-4 overflow-y-scroll h-[40vh]">
            {activities.map((activity: any, index: number) => (
              <div key={index} className="p-4 border rounded-lg shadow-md">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(activity.date_time).toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-700 font-semibold">
                    {activity.user.first_name} {activity.user.last_name}
                  </span>
                </div>

                <div className="mt-2">
                  <div className="font-medium">{activity.type}</div>

                  {/* Conditional rendering for specific activity types */}
                  {activity.type === "Photo Upload" && (
                    <div className="mt-2">
                      <Image
                        width={400}
                        height={250}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${activity.photo.file_name}`} // Adjust based on your file path
                        alt="Uploaded photo"
                        className="w-20 h-20 object-cover"
                      />
                    </div>
                  )}

                  {activity.type === "New Comment" && activity.photo && (
                    <div className="mt-2">
                      <Image
                        width={400}
                        height={250}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${activity.photo.file_name}`} // Adjust based on your file path
                        alt="Commented photo"
                        className="w-20 h-20 object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleRefresh}>
          <RefreshCwIcon className="mr-2 size-4" />
          Refresh
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
