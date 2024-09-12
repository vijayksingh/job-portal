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
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [skillFilter, setSkillFilter] = useState("");
  const [minSalary, setMinSalary] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, [page]);

  useEffect(() => {
    filterJobs();
  }, [jobs, skillFilter, minSalary]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?page=${page}&limit=10`, {
        headers: {
          "X-API-Key": API_KEY || "",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const newJobs = await response.json();
      setJobs((prevJobs) => [...prevJobs, ...newJobs]);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setLoading(false);
  };

  const filterJobs = () => {
    const filtered = jobs.filter((job) => {
      const jobSalary = parseFloat(
        job.salary?.replace(/[^0-9.-]+/g, "") || "0",
      );
      return (
        jobSalary >= minSalary &&
        (skillFilter === "" ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(skillFilter.toLowerCase()),
          ))
      );
    });
    setFilteredJobs(filtered);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
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
          skillFilter={skillFilter}
          setSkillFilter={setSkillFilter}
        />
        <SalaryFilter minSalary={minSalary} setMinSalary={setMinSalary} />
      </div>

      <div className="space-y-4">
        {filteredJobs.map((job, index) => (
          <JobCard key={`${index}-${job.id}`} job={job} />
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
