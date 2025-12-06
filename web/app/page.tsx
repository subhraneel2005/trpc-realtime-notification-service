"use client";
import { Button } from "@/components/ui/button";
import { WS_CLIENT_EVENTS } from "@/types/events/wsEvents";
import { trpc } from "@/utils/trpcClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const { data, error, isLoading } = trpc.user.getById.useQuery(undefined, {
    enabled: isClient && !!token, // Only run query when client-side and token exists
  });

  const wsMutation = trpc.ws.connectUserToWSS.useMutation();

  // Connect to WebSocket when component mounts and user data is available
  useEffect(() => {
    const connectUserToWSS = async () => {
      if (!data?.id) return;

      try {
        const res = await wsMutation.mutateAsync({
          type: WS_CLIENT_EVENTS.CONNECTION,
          userId: data.id,
        });
        console.log("WebSocket connection initiated: ", res);
      } catch (err) {
        console.error("WebSocket connection error: ", err);
      }
    };

    connectUserToWSS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.id]); // Only reconnect when userId changes

  // Show nothing during SSR
  if (!isClient) return null;

  // Show nothing if no token
  if (!token) return null;

  if (isLoading) return <div>Loading user...</div>;

  if (error) return <div>Error loading user: {error.message}</div>;

  console.log("User Data: ", data);

  return (
    <div className="min-h-screen flex-col w-full justify-center items-center flex">
      <h1 className="text-xl max-w-xl font-semibold">
        realtime notifications service using tRPC and Websockets
      </h1>
      <Link href={"/signup"} className="mt-4">
        <Button>Signup</Button>
      </Link>
    </div>
  );
}
