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
              href="/freelancer/profile"
              className="text-foreground hover:text-primary"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/freelancer/jobs"
              className="text-foreground hover:text-primary"
            >
              Find Jobs
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
