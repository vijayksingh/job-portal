import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
        Job Portal
      </h1>
      <p className="mb-8 text-center text-lg text-gray-600 dark:text-gray-300">
        Find your next opportunity
      </p>
      <div className="space-x-4">
        <Link href="/login">
          <Button className="bg-blue-600 px-6 py-3 text-lg hover:bg-blue-700">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
