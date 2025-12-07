"use client";

import { trpc } from "@/utils/trpcClient";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function FeedScreen() {
  const [postContent, setPostContent] = useState("");
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));

  const utils = trpc.useUtils();

  const mutatePost = trpc.post.create.useMutation({
    onSuccess: () => utils.post.getAll.invalidate(),
  });

  const mutateLike = trpc.post.like.useMutation({
    onSuccess: () => utils.post.getAll.invalidate(),
  });

  const { data: posts, isLoading, isError } = trpc.post.getAll.useQuery();

  const handleCreatePost = async () => {
    if (!postContent.trim()) return;

    await mutatePost.mutateAsync({
      content: postContent,
    });

    setPostContent("");
  };

  const handleLike = async (postId: string) => {
    await mutateLike.mutateAsync({
      postId,
      userId: userId!,
    });
  };

  if (isLoading)
    return (
      <div className="space-y-4 p-4">
        <Card>
          <CardContent>
            <div className="h-20 w-full bg-muted animate-pulse" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="h-20 w-full bg-muted animate-pulse" />
          </CardContent>
        </Card>
      </div>
    );

  if (isError) return <div className="p-4">Failed to load posts</div>;

  return (
    <div className="max-w-xl mx-auto space-y-6 p-4">
      {/* Create Post */}
      <Card>
        <CardHeader>Create a Post</CardHeader>
        <CardContent>
          <Textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write something..."
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreatePost}>Post</Button>
        </CardFooter>
      </Card>

      <Separator />

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts?.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.user.pfp} alt="@shadcn" />
                  <AvatarFallback>{post.user.username}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{post.user.username}</span>
              </div>
              <CardContent>{post.content}</CardContent>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => handleLike(post.id)}>
                Like ({post._count.likes})
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
