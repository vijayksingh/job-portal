"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGitHubData } from "@/hooks/useGithubData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  bio: z.string().max(160, "Bio must be 160 characters or less"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  githubUsername: z.string().min(1, "GitHub username is required"),
});

const skillOptions = ["ReactJS", "NextJS", "TypeScript", "Rust"];

const workPlatforms = [
  { name: "DEV", icon: "🖥️" },
  { name: "Dribbble", icon: "🏀" },
  { name: "Gumroad", icon: "🛒" },
  { name: "Hashnode", icon: "📝" },
  { name: "Medium", icon: "📰" },
  { name: "Product Hunt", icon: "🦄" },
  { name: "RSS feed", icon: "📡" },
  { name: "Substack", icon: "📧" },
  { name: "YouTube", icon: "🎥" },
  { name: "CodeForces", icon: "🏆" },
];

export default function FreelancerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "Vijay Singh",
      bio: "Build stuff",
      skills: ["ReactJS", "NextJS", "TypeScript", "Rust"],
      githubUsername: "vijayksingh",
    },
  });

  const { data: githubData, loading: githubLoading } = useGitHubData(
    watch("githubUsername"),
  );

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="size-16">
            <AvatarImage src="/path-to-profile-image.jpg" alt="Vijay Singh" />
            <AvatarFallback>VS</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{watch("fullName")}</h1>
            <p className="text-gray-600">{watch("bio")}</p>
          </div>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Save Profile" : "Edit Profile"}
        </Button>
      </div>

      <p className="mb-4 text-sm text-gray-500">Member since Mar 2024</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {watch("skills").map((skill) => (
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>

      <Tabs defaultValue="work" className="mb-6">
        <TabsList>
          <TabsTrigger value="work">WORK</TabsTrigger>
          <TabsTrigger value="resume">RESUME</TabsTrigger>
          <TabsTrigger value="collections">COLLECTIONS</TabsTrigger>
          <TabsTrigger value="vouch">VOUCH</TabsTrigger>
          <TabsTrigger value="posts">POSTS • 0</TabsTrigger>
        </TabsList>
        <TabsContent value="work">
          <h2 className="mb-4 text-xl font-semibold">
            Showcase your work from:
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {workPlatforms.map((platform) => (
              <Button
                key={platform.name}
                variant="outline"
                className="justify-start"
              >
                <span className="mr-2">{platform.icon}</span> {platform.name}
              </Button>
            ))}
            <Button variant="outline" className="justify-start">
              <span className="mr-2">📦</span> Add Project
            </Button>
          </div>
        </TabsContent>
        {/* Add content for other tabs as needed */}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <svg
              className="mr-2 size-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </CardTitle>
        </CardHeader>
        <CardContent>
          {githubLoading ? (
            <p>Loading GitHub data...</p>
          ) : githubData ? (
            <>
              <p>{githubData.contributions} Contributions in the last year</p>
              <p>Total {githubData.publicRepos} repositories</p>
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold">Recent Repositories:</h3>
                {githubData.repositories.map((repo) => (
                  <div key={repo.name} className="rounded border p-2">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline"
                    >
                      {repo.name}
                    </a>
                    <p className="text-sm text-gray-600">{repo.description}</p>
                    {/* Note: language, stars, and forks are not available in the current data */}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No GitHub data available</p>
          )}
        </CardContent>
      </Card>

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <Input {...register("fullName")} placeholder="Full Name" />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}

          <Input {...register("bio")} placeholder="Bio" />
          {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}

          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <div>
                {skillOptions.map((skill) => (
                  <label key={skill} className="mr-4 inline-flex items-center">
                    <input
                      type="checkbox"
                      value={skill}
                      checked={field.value.includes(skill)}
                      onChange={(e) => {
                        const updatedSkills = e.target.checked
                          ? [...field.value, skill]
                          : field.value.filter((s: string) => s !== skill);
                        field.onChange(updatedSkills);
                      }}
                    />
                    <span className="ml-2">{skill}</span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.skills && (
            <p className="text-red-500">{errors.skills.message}</p>
          )}

          <Input
            {...register("githubUsername")}
            placeholder="GitHub Username"
          />
          {errors.githubUsername && (
            <p className="text-red-500">{errors.githubUsername.message}</p>
          )}

          <Button type="submit">Save Changes</Button>
        </form>
      )}
    </div>
  );
}
