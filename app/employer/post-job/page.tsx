"use client";
import { MultiSelect } from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Jobs } from "@/constants/jobs";
import { Skills } from "@/constants/skills";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const MAX_FILE_SIZE = 16 * 1024; // 16KB

const jobPostingSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.union([
    z.string().min(1, "Job description is required"),
    z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 16KB.`)
      .refine(
        (file) =>
          [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type),
        "Only .pdf, .doc, and .docx files are accepted.",
      ),
  ]),
  requirements: z.string().min(1, "Job requirements are required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  companyName: z.string().min(1, "Company name is required"),
  contactInfo: z.string().email("Invalid email address"),
});

type JobPostingFormData = z.infer<typeof jobPostingSchema>;

export default function PostJob() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const skillOptions = useMemo(
    () =>
      Skills.map((skill) => ({
        label: skill,
        value: skill,
      })),
    [],
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<JobPostingFormData>({
    resolver: zodResolver(jobPostingSchema),
  });

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        if (file.size > MAX_FILE_SIZE) {
          setError("description", {
            type: "manual",
            message: `Max file size is 16KB.`,
          });
        } else {
          clearErrors("description");
        }
      }
    },
    [setError, clearErrors],
  );

  const onSubmit = async (data: JobPostingFormData) => {
    setIsSubmitting(true);
    try {
      // Handle description (file or text)
      let description = data.description;
      if (selectedFile) {
        // Here you would typically upload the file and get a URL
        // For this example, we'll just use the file name
        description = selectedFile.name;
      }

      // Save to local storage
      const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
      jobs.push({ ...data, description, id: Date.now(), applications: 0 });
      localStorage.setItem("jobs", JSON.stringify(jobs));

      toast({
        title: "Job Posted",
        description: "Your job has been successfully posted.",
      });
      router.push("/employer/manage-jobs");
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
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job title" />
                    </SelectTrigger>
                    <SelectContent>
                      {Jobs.map((job) => (
                        <SelectItem key={job} value={job}>
                          {job}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <p className="mt-1 text-sm text-gray-500">
                  Selected file: {selectedFile.name} (
                  {(selectedFile.size / 1024).toFixed(2)} KB)
                </p>
              )}
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
              <label
                htmlFor="skills-select"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Skills
              </label>
              <Controller
                name="tags"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <MultiSelect
                    options={skillOptions}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select skills"
                    animation={0.3}
                    maxCount={5}
                    modalPopover={false}
                    className="w-full"
                    aria-invalid={errors.tags ? "true" : "false"}
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
