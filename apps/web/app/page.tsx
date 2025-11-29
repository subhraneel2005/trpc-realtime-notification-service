"use client";

import React from "react";
import { trpc } from "../trpc/client";
export default function Home() {
  const { data, error, isLoading } = trpc.user.greeting.useQuery();

  if (isLoading) return <div>Loading...</div>;

  console.log(data);

  return <div className="">{data}</div>;
}
