import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
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
