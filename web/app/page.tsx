import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpcClient";
import Link from "next/link";

export default function Home() {
  const getLoggedInUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    if (typeof token !== "string") return null;

    const { data, error, isLoading } = await trpc.user.getById.useQuery();

    if (isLoading) return <div>Loading user...</div>;
    if (error) return <div>Error loading user: {error.message}</div>;

    console.log("User Data: ", data);
  };
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
