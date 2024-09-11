"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Define the Job type
type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
  skills: string[];
  salary?: string;
  experience?: string;
};

// Mock data for jobs
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Design Engineer",
    company: "Restream",
    location: "Remote",
    type: "Full-time",
    postedAt: "7 days ago",
    skills: ["Angular", "Figma", "React", "Typescript"],
  },
  {
    id: "2",
    title: "Software Engineer II",
    company: "Bentley Systems",
    location: "Hybrid (Pune, India)",
    type: "Full-time",
    postedAt: "7 days ago",
    skills: ["React", "NextJS", "SQLite", "NodeJS"],
  },
  // Add more mock jobs here...
];

export default function JobListings() {
  const [jobs] = useState<Job[]>(mockJobs);

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="all-jobs" className="mb-6">
        <TabsList>
          <TabsTrigger value="recommended">RECOMMENDED</TabsTrigger>
          <TabsTrigger value="all-jobs">ALL JOBS</TabsTrigger>
          <TabsTrigger value="saved">SAVED</TabsTrigger>
          <TabsTrigger value="applied">APPLIED</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative mb-6">
        <Input placeholder="Search jobs..." className="w-full pl-10" />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <div className="flex items-start space-x-4 rounded-lg border p-4 shadow-sm">
      <Avatar className="size-12">
        <AvatarImage
          src={`https://logo.clearbit.com/${job.company.toLowerCase().replace(/\s+/g, "")}.com`}
          alt={job.company}
        />
        <AvatarFallback>{job.company[0]}</AvatarFallback>
      </Avatar>
      <div className="grow">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-500">
              {job.company} • {job.location} • {job.type} • {job.postedAt}
            </p>
          </div>
          <Button variant="ghost" className="size-8 p-0">
            <Bookmark className="size-4" />
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="flex items-center gap-1"
            >
              <Image
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase()}/${skill.toLowerCase()}-original.svg`}
                alt={skill}
                className="size-4"
                width={20}
                height={20}
              />
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="secondary">+{job.skills.length - 4}</Badge>
          )}
        </div>
        {(job.salary || job.experience) && (
          <p className="mt-2 text-sm text-gray-600">
            {job.salary && `${job.salary} • `}
            {job.experience && `${job.experience} experience`}
          </p>
        )}
      </div>
    </div>
  );
}
