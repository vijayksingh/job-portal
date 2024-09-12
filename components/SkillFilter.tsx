import { MultiSelect } from "@/components/MultiSelect";
import { Skills } from "@/constants/skills";

type SkillFilterProps = {
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
};

export function SkillFilter({
  selectedSkills,
  setSelectedSkills,
}: SkillFilterProps) {
  const skillOptions = Skills.map((skill) => ({ label: skill, value: skill }));

  return (
    <MultiSelect
      options={skillOptions}
      onValueChange={setSelectedSkills}
      defaultValue={selectedSkills}
      placeholder="Filter by skills"
      className="w-full"
    />
  );
}
