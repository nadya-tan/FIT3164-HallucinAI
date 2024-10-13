import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useOnScreen from "@/lib/useOnScreen";
import { LoaderCircle } from "lucide-react";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Label, XAxis, YAxis } from "recharts";
function DetectionFactCC({ data }) {
  const { isIntersecting, ref } = useOnScreen({ threshold: 0.1 });
  const dataArr = useMemo(() => {
    return (
      data && [
        {
          label: "Correct",
          value: data.flat(1).filter((x) => x === "CORRECT").length,
        },
        {
          label: "Incorrect",
          value: data.flat(1).filter((x) => x === "INCORRECT").length,
        },
      ]
    );
  }, [data]);
  return data ? (
    <ChartContainer className="min-h-40 w-full py-4" config={{}} ref={ref}>
      <div className="w-full flex flex-row justify-center items-center">
        <span>FactCC Evaluation: Correct vs Incorrect Summaries</span>
      </div>
      <BarChart accessibilityLayer data={isIntersecting ? dataArr : []}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis>
          <Label
            angle={-90}
            value="Frequency"
            fontSize={14}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" radius={4}>
          <Cell fill="#94a3b8" />
          <Cell fill="#64748b" />
        </Bar>
      </BarChart>
    </ChartContainer>
  ) : (
    <LoaderCircle className="animate-spin" />
  );
}

export default DetectionFactCC;
