import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DollarSign } from "lucide-react";

type SalaryFilterProps = {
  minSalary: number;
  setMinSalary: (value: number) => void;
};

export function SalaryFilter({ minSalary, setMinSalary }: SalaryFilterProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center space-x-2">
        <DollarSign className="text-gray-400" size={20} />
        <span>Min. Salary: ${minSalary}/hour</span>
      </Label>
      <Slider
        min={0}
        max={200}
        step={5}
        value={[minSalary]}
        onValueChange={(value) => setMinSalary(value[0])}
        className="grow"
      />
    </div>
  );
}
