import Link from "next/link";
import React from "react";

export default function FreelancerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="mb-8 border-b bg-background p-4">
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/employer/manage-job"
              className="text-foreground hover:text-primary"
            >
              Manage Jobs
            </Link>
          </li>
          <li>
            <Link
              href="/employer/post-job"
              className="text-foreground hover:text-primary"
            >
              Post Jobs
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
