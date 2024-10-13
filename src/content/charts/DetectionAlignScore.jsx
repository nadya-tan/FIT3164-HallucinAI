import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useOnScreen from "@/lib/useOnScreen";
import { LoaderCircle } from "lucide-react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  XAxis,
  YAxis,
} from "recharts";
function DetectionAlignScore({ data }) {
  const { isIntersecting, ref } = useOnScreen({ threshold: 0.1 });
  const dataArr = useMemo(() => {
    if (!data) return [];
    let arr = [];
    for (let i = 0.0; i < 1.0; i += 0.1) {
      i = Number(i.toFixed(1));
      arr.push({
        bin: `${i}..${(i + 0.1).toFixed(1)}`,
        x0: i,
        value: data.flat(1).filter((x) => x >= i && x < i + 0.1).length,
      });
    }
    return arr;
  }, [data]);
  return data ? (
    <ChartContainer className="min-h-40 w-full py-4" config={{}} ref={ref}>
      <div className="w-full flex flex-row justify-center items-center">
        <span>AlignScore Evaluation: Score Distribution</span>
      </div>
      <BarChart
        accessibilityLayer
        data={isIntersecting ? dataArr : []}
        margin={{ bottom: 20 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="bin"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          hide
        />
        <XAxis dataKey="x0" scale="band" xAxisId="values">
          <Label
            value="Score (higher is better)"
            offset={5}
            height={30}
            fontSize={14}
            position={"bottom"}
          />
        </XAxis>
        <YAxis>
          <Label
            value="Frequency"
            angle={-90}
            offset={5}
            fontSize={14}
            position="insideLeft"
          />
        </YAxis>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" radius={4}>
          <Cell fill="color-mix(in srgb, #94a3b8 0%, #475569 100%)" />
          <Cell fill="color-mix(in srgb, #94a3b8 10%, #475569 90%)" />
          <Cell fill="color-mix(in srgb, #94a3b8 20%, #475569 80%)" />
          <Cell fill="color-mix(in srgb, #94a3b8 30%, #475569 70%)" />
          <Cell fill="color-mix(in srgb, #94a3b8 40%, #475569 60%)" />
          <Cell fill="color-mix(in srgb, #94a3b8 50%, #475569 50%)" />
          <Cell fill="color-mix(in srgb, #94a3b8 60%, #475569 40%)" />
          <Cell fill="color-mix(in srgb, #94a3b8 70%, #475569 30%)" />
          <Cell fill="color-mix(in srgb, #94a3b8 80%, #475569 20%)" />
          <Cell fill="color-mix(in srgb, #94a3b8 90%, #475569 10%)" />
        </Bar>
      </BarChart>
    </ChartContainer>
  ) : (
    <LoaderCircle className="animate-spin" />
  );
}

export default DetectionAlignScore;
