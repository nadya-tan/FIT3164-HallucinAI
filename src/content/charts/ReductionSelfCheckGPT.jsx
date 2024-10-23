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
function ReductionSelfCheckGPT({ data }) {
  const { isIntersecting, ref } = useOnScreen({ threshold: 0.1 });
  const dataArr = useMemo(() => {
    if (!data) return [];
    let arr = [];
    for (let i = -1.0; i < 1.0; i += 0.1) {
      i = Number(i.toFixed(1));
      arr.push({
        bin: `${i}..${(i + 0.1).toFixed(1)}`,
        x0: i,
        value: data
          .map((x) => x.score_delta)
          .flat(1)
          .filter((x) => x >= i && x < i + 0.1).length,
      });
    }

    // remove leading zeros
    while (arr[0].value === 0) arr.shift();
    return arr;
  }, [data]);
  return data ? (
    <ChartContainer className="min-h-[200px] w-full py-4" config={{}} ref={ref}>
      <div className="w-full flex flex-row justify-center items-center">
        <span>SelfCheckGPT Hallucination Reduction: Score Delta Distribution</span>
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
            value="Score (lower is better)"
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
          {dataArr.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`color-mix(in srgb, #94a3b8 ${
                100 - (index / dataArr.length) * 100
              }%, #475569 ${(index / dataArr.length) * 100}%)`}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  ) : (
    <LoaderCircle className="animate-spin" />
  );
}

export default ReductionSelfCheckGPT;
