"use client";

import { SalaryFilter } from "@/components/SalaryFilter";
import { SkillFilter } from "@/components/SkillFilter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Job } from "@/types";
import { useEffect, useState } from "react";
import { JobCard } from "./_components/JobCard";

const API_URL = "https://my.api.mockaroo.com/job";
const API_KEY = process.env.NEXT_PUBLIC_MOCKAROO_API_KEY;

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, [page, selectedSkills, minSalary]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        skills: selectedSkills.join(","),
        minSalary: minSalary.toString(),
      });

      const response = await fetch(`${API_URL}?${queryParams}`, {
        headers: {
          "X-API-Key": API_KEY || "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const newJobs = await response.json();
      setJobs((prevJobs) => (page === 1 ? newJobs : [...prevJobs, ...newJobs]));
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSkillsChange = (newSkills: string[]) => {
    setSelectedSkills(newSkills);
    setPage(1);
  };

  const handleSalaryChange = (newMinSalary: number) => {
    setMinSalary(newMinSalary);
    setPage(1);
  };

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

      <div className="mb-6 space-y-4">
        <SkillFilter
          selectedSkills={selectedSkills}
          setSelectedSkills={handleSkillsChange}
        />
        <SalaryFilter minSalary={minSalary} setMinSalary={handleSalaryChange} />
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Button onClick={handleLoadMore} className="mt-4">
          Load More
        </Button>
      )}
    </div>
  );
}
