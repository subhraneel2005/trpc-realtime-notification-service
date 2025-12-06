"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpcClient";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

const PFP_OPTIONS = [
  "https://cdn.pfps.gg/pfps/51247-mr-penis.jpeg",
  "https://cdn.pfps.gg/pfps/56355-greg.jpeg",
  "https://cdn.pfps.gg/pfps/8590-funny-gta.png",
  "https://cdn.pfps.gg/pfps/6252-duck-funny.png",
  "https://cdn.pfps.gg/pfps/6996-batman-funny.png",
  "https://cdn.pfps.gg/pfps/2079-funny-cat.png",
  "https://cdn.pfps.gg/pfps/9456-cute-funny.png",
];

export default function Signup() {
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState(PFP_OPTIONS[0]);
  const mutation = trpc.user.add.useMutation();

  const handleSignup = async () => {
    if (!username) return;

    const res = await mutation.mutateAsync({
      username,
      pfp,
    });

    // save JWT
    localStorage.setItem("token", res.token);

    alert("Signed up successfully!");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle className="text-center">Create Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input
              placeholder="type your username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Profile pictures */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Choose Profile Picture
            </label>

            <div className="grid grid-cols-4 gap-3">
              {PFP_OPTIONS.map((img) => (
                <button
                  key={img}
                  onClick={() => setPfp(img)}
                  className={cn(
                    "rounded-full p-1 border transition",
                    pfp === img
                      ? "border-primary ring-2 ring-primary"
                      : "border-muted-foreground/30"
                  )}
                >
                  <Image
                    width={150}
                    height={150}
                    src={img}
                    alt="pfp"
                    className="rounded-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button
            className="w-full"
            onClick={handleSignup}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Sign Up"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
