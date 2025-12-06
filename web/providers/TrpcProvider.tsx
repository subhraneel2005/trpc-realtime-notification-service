"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

import { httpBatchLink } from "@trpc/react-query";
import { trpc } from "@/utils/trpcClient";

export default function TrpcProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          fetch(url, options) {
            const token =
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : null;

            return fetch(url, {
              ...options,
              headers: {
                ...options?.headers,
                Authorization: token ?? "",
              },
            });
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
