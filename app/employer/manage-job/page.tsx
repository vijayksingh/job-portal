"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppliedJob } from "@/types";
import { useEffect, useState } from "react";

export default function ManageJobs() {
  const [jobs, setJobs] = useState<AppliedJob[]>([]);

  useEffect(() => {
    // TODO: Fetch jobs from API
    const fetchJobs = async () => {
      // Simulating API call
      const mockJobs: AppliedJob[] = [
        {
          id: 1,
          title: "Frontend Developer",
          company: "TechCorp",
          location: "Remote",
          type: "Full-time",
          posted_at: "2023-03-15",
          skills: ["React", "TypeScript"],
          salary: "$80,000 - $120,000",
          applied: ["1", "2", "3"],
          companyId: "1",
        },
        // Add more mock jobs as needed
      ];
      setJobs(mockJobs);
    };

    fetchJobs();
  }, []);

  const viewApplicant = (jobId: number) => {
    // TODO: Implement view applicant functionality
    console.log(`View applicants for job ${jobId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Manage Posted Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.posted_at}</TableCell>
                  <TableCell>{job.applied.length}</TableCell>
                  <TableCell>
                    <Button onClick={() => viewApplicant(job.id)}>
                      View Applicants
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
