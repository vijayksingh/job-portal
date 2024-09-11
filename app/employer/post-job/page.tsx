"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const jobPostingSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().max(16 * 1024, "Description must be 16KB or less"),
  requirements: z.string().min(1, "Job requirements are required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  companyName: z.string().min(1, "Company name is required"),
  contactInfo: z.string().email("Invalid email address"),
});

type JobPostingFormData = z.infer<typeof jobPostingSchema>;

export default function PostJob() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JobPostingFormData>({
    resolver: zodResolver(jobPostingSchema),
  });

  const onSubmit = async (data: JobPostingFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to post job
      console.log(data);
      toast({
        title: "Job Posted",
        description: "Your job has been successfully posted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error posting your job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input {...register("title")} placeholder="Job Title" />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Textarea
                {...register("description")}
                placeholder="Job Description"
                rows={5}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Textarea
                {...register("requirements")}
                placeholder="Job Requirements"
                rows={3}
              />
              {errors.requirements && (
                <p className="text-sm text-red-500">
                  {errors.requirements.message}
                </p>
              )}
            </div>

            <div>
              <Controller
                name="tags"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Tags (comma-separated)"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((tag) => tag.trim()),
                      )
                    }
                  />
                )}
              />
              {errors.tags && (
                <p className="text-sm text-red-500">{errors.tags.message}</p>
              )}
            </div>

            <div>
              <Input {...register("companyName")} placeholder="Company Name" />
              {errors.companyName && (
                <p className="text-sm text-red-500">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div>
              <Input
                {...register("contactInfo")}
                placeholder="Contact Email"
                type="email"
              />
              {errors.contactInfo && (
                <p className="text-sm text-red-500">
                  {errors.contactInfo.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
