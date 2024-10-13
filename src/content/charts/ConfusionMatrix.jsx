import { cn } from "@/lib/utils";
import { useMemo } from "react";

function MatrixCell({ children, className }) {
  return (
    <div
      className={cn(
        "flex justify-center items-center border border-zinc-600",
        className
      )}
    >
      {children}
    </div>
  );
}

function ConfusionMatrix({ title, data, better }) {
  console.log(data);
  const isPositive = (x) =>
    better === "positive" ? x * 10000.0 >= 0.0 : x * 10000.0 <= 0.0;

  const dataObj = useMemo(() => {
    if (!data) return {};

    let obj = {
      truePositive: data.filter(
        (x) => isPositive(x.score_delta) && x.human_annotation == 1
      ).length,
      falsePositive: data.filter(
        (x) => isPositive(x.score_delta) && x.human_annotation == 0
      ).length,
      trueNegative: data.filter(
        (x) => !isPositive(x.score_delta) && x.human_annotation == 1
      ).length,
      falseNegative: data.filter(
        (x) => !isPositive(x.score_delta) && x.human_annotation == 0
      ).length,
    };
    return obj;
  }, [data]);
  data && console.log(
    data.filter((x) => !isPositive(x.score_delta) && x.human_annotation == 0)
  );
  return (
    <div className="flex flex-col w-full items-center mt-4">
      <span className="text-xs">{title} Confusion Matrix</span>
      <div className="grid grid-rows-3 grid-cols-3 aspect-square w-1/3 min-w-32 grid-flow-row text-md">
        <MatrixCell />
        <MatrixCell className="bg-green-600/20">Better</MatrixCell>
        <MatrixCell className="bg-red-600/20">Worse</MatrixCell>
        <MatrixCell className="bg-green-600/20">Actually Better</MatrixCell>
        <MatrixCell>{dataObj.truePositive}</MatrixCell>
        <MatrixCell>{dataObj.falseNegative}</MatrixCell>
        <MatrixCell className="bg-red-600/20">Actually Worse</MatrixCell>
        <MatrixCell>{dataObj.falsePositive}</MatrixCell>
        <MatrixCell>{dataObj.trueNegative}</MatrixCell>
      </div>
    </div>
  );
}

export default ConfusionMatrix;
