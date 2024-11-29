"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserAvatar from "./UserAvatar";

import { RefreshCwIcon, LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

interface ActivitiesProps {
  className?: string;
}
export default function Activities({ className }: ActivitiesProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [activities, setActivities] = useState<any[]>([]); // Store the fetched activities
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axiosInstance.get("/admin/activity");

        setActivities(response.data.data);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("Failed to load activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleRefresh = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.get("/admin/activity");
      setActivities(response.data.data);
    } catch (err) {
      console.error("Error refreshing activities:", err);
      setError("Failed to refresh activities");
    } finally {
      setLoading(false);
    }
  };

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

                  {activity.type === "Photo Upload" && (
                    <div className="mt-2">
                      <Image
                        width={200}
                        height={100}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${activity.photo.file_name}`}
                        alt="Uploaded photo"
                        className="w-100 h-20 object-cover"
                      />
                    </div>
                  )}
                  {activity.type === "Photo Like" && (
                    <div className="mt-2">
                      <Image
                        width={200}
                        height={100}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${activity.photo.file_name}`}
                        alt="Liked photo"
                        className="w-100 h-20 object-cover"
                      />
                    </div>
                  )}
                  {activity.type === "Photo Unlike" && (
                    <div className="mt-2">
                      <Image
                        width={200}
                        height={100}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${activity.photo.file_name}`}
                        alt="Unliked photo"
                        className="w-100 h-20 object-cover"
                      />
                    </div>
                  )}

                  {activity.type === "New Comment" && activity.photo && (
                    <div className="mt-2">
                      <Image
                        width={200}
                        height={100}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${activity.photo.file_name}`}
                        alt="Commented photo"
                        className="w-100 h-20 object-cover"
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
