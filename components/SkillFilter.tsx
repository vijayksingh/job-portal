import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SkillFilterProps = {
  skillFilter: string;
  setSkillFilter: (value: string) => void;
};

export function SkillFilter({ skillFilter, setSkillFilter }: SkillFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <Search className="text-gray-400" size={20} />
      <Input
        placeholder="Filter by skill..."
        value={skillFilter}
        onChange={(e) => setSkillFilter(e.target.value)}
        className="grow"
      />
    </div>
  );
}
