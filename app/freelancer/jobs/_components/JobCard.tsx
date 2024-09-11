import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Job } from "@/types";

import { Bookmark } from "lucide-react";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  const handleQuickApply = () => {
    toast({
      title: "Application Submitted",
      description: `You've successfully applied to ${job.title} at ${job.company}.`,
    });
  };

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
              {job.company} • {job.location} • {job.type} • {job.posted_at}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" className="size-8 p-0">
              <Bookmark className="size-4" />
            </Button>
            <Button onClick={handleQuickApply} size="sm">
              Quick Apply
            </Button>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {skill}
            </Badge>
          ))}
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
