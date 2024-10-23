import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import DetectionFactCC from "./charts/DetectionFactCC";
import DetectionSelfCheckGPTOriginal from "./charts/DetectionSelfCheckGPTOriginal";
import DetectionSelfCheckGPTConsistency from "./charts/DetectionSelfCheckGPTConsistency";
import DetectionAlignScore from "./charts/DetectionAlignScore";
import ReductionCove from "./charts/ReductionCove";
import ConfusionMatrix from "./charts/ConfusionMatrix";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReductionSelfCheckGPT from "./charts/ReductionSelfCheckGPT";
function Results() {
  const [modelSelection, setModelSelection] = useState("mistral");
  const [modelData, setModelData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const detection_factcc = await fetch(
        `${
          import.meta.env.BASE_URL
        }data/${modelSelection}/detection_factcc.json`
      );
      const detection_selfcheck_original = await fetch(
        `${
          import.meta.env.BASE_URL
        }data/${modelSelection}/detection_selfcheckgpt_compare_original.json`
      );
      const detection_selfcheck_self = await fetch(
        `${
          import.meta.env.BASE_URL
        }data/${modelSelection}/detection_selfcheckgpt_compare_self.json`
      );
      const detection_alignscore = await fetch(
        `${
          import.meta.env.BASE_URL
        }data/${modelSelection}/detection_alignscore.json`
      );
      const reduction_selfcheck = await fetch(
        `${
          import.meta.env.BASE_URL
        }data/${modelSelection}/reduction_selfcheckgpt.json`
      );
      const reduction_cove = await fetch(
        `${import.meta.env.BASE_URL}data/${modelSelection}/reduction_cove.json`
      );
      const annotated_reduction_selfcheck = await fetch(
        `${
          import.meta.env.BASE_URL
        }data/${modelSelection}/reduction_selfcheckgpt_annotated.json`
      );
      const annotated_reduction_cove = await fetch(
        `${
          import.meta.env.BASE_URL
        }data/${modelSelection}/reduction_cove_annotated.json`
      );

      setModelData({
        detection_factcc: await detection_factcc.json(),
        detection_selfcheck_original: await detection_selfcheck_original.json(),
        detection_selfcheck_self: await detection_selfcheck_self.json(),
        detection_alignscore: await detection_alignscore.json(),
        reduction_selfcheck: await reduction_selfcheck.json(),
        reduction_cove: await reduction_cove.json(),
        annotated_reduction_selfcheck:
          await annotated_reduction_selfcheck.json(),
        annotated_reduction_cove: await annotated_reduction_cove.json(),
      });
    }
    setModelData({});
    fetchData();
  }, [modelSelection]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-right-5 ease-out">
      <div className="flex flex-row items-center space-x-4">
        <h1>Results</h1>
        <Select
          defaultValue="mistral"
          onValueChange={(selection) => setModelSelection(selection)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mistral">Mistral 7B</SelectItem>
            <SelectItem value="llama">LLaMA 7B</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <span className="mt-4 text-zinc-400 leading-tight block">
        The research consists of multiple detection and reduction modules tested
        on a variety of LLMs. Select the data you want to see in the dropdown
        above.
      </span>

      <h2>Detection Modules</h2>
      <p>
        The following hallucination detection modules were tested, which either
        performed a scoring or binary classification of the output&apos;s
        accuracy in context of the input prompt.
      </p>
      <p>
        In each module, the task was to summarise a given passage from the HaDeS
        dataset. For each passage, the model was asked to generate four
        summaries.
      </p>

      <h3>FactCC</h3>
      <p>
        FactCC classified the output either as &apos;CORRECT&apos; or
        &apos;INCORRECT&apos; given the original passage.
      </p>
      <DetectionFactCC data={modelData.detection_factcc} />

      <h3>SelfCheckGPT</h3>
      <p>
        SelfCheckGPT provided a contradiction score (lower is better) for each
        sentence of the input context, which was averaged. We provided both the
        original passage and the first generated summary as the input context
        for SelfCheckGPT. This allowed us to evaluate both how well the output
        contradicted the input context and its own consistency across the four
        summaries.
      </p>
      <DetectionSelfCheckGPTOriginal
        data={modelData.detection_selfcheck_original}
      />
      <DetectionSelfCheckGPTConsistency
        data={modelData.detection_selfcheck_self}
      />

      <h3>AlignScore</h3>
      <p>
        AlignScore calculated the alignment score (higher is better) between the
        input context and the generated summary.
      </p>
      <DetectionAlignScore data={modelData.detection_alignscore} />

      <h2>Reduction Modules</h2>
      <p>
        The following hallucination reduction modules were tested, which aimed
        to reduce hallucinations in the generated summaries.
      </p>

      <h3>CoVe</h3>
      <p>
        Chain-of-Verification (CoVe) is a hallucination reduction method that
        uses a style of prompting such that the model can verify the correctness
        of its own output.
      </p>
      <p>
        In this case, the top 100 worst AlignScore evaluated summaries were
        selected. The model was asked to split the summaries into individual
        factual claims then verify each claim, whereby claims that it determines
        to be false were dropped from the output. The verified output was then
        re-evaluated by AlignScore.
      </p>
      <p>
        The decision to use AlignScore was made because the aim of this method
        is to omit hallucinations, so it may result in a less representative
        summary, but one that is more accurate.
      </p>
      <ReductionCove data={modelData.reduction_cove} />
      <p>
        The top 10 deltas on each side of the distribution were selected for
        human annotation to determine if the new summary was actually better or
        worse as evaluated by AlignScore. It is annotated as the value 1 if the
        delta is in the correct direction, and 0 if it is not.
      </p>
      <ConfusionMatrix
        data={modelData.annotated_reduction_cove}
        better="positive"
        title="CoVe Reduction"
      />
      <span className="mt-4 text-zinc-400 leading-tight lg:hidden">
        Table hidden on mobile view.
      </span>
      <ScrollArea className="mt-4 h-[800px] w-full hidden lg:block">
        <Table>
          <TableHeader>
            {[
              "Context",
              "Original Summary",
              "New Summary",
              "Score Delta",
              "Human Annotation",
            ].map((header) => (
              <TableHead key={header} className="bg-zinc-950">
                {header}
              </TableHead>
            ))}
          </TableHeader>
          <TableBody>
            {modelData.annotated_reduction_cove &&
              modelData.annotated_reduction_cove.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.original}</TableCell>
                  <TableCell>{row.old_summary}</TableCell>
                  <TableCell>{row.new_summary}</TableCell>
                  <TableCell>{row.score_delta}</TableCell>
                  <TableCell>{row.human_annotation}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <h2>SelfCheckGPT</h2>
      <p>
        SelfCheckGPT can score model outputs based on how accurate and
        representative it is when compared to the context. Based on this, the
        model was asked to keep generating summaries until the score was a low
        enough average to be considered accurate.
      </p>
      <p>
        The top 100 worst SelfCheckGPT evaluated summaries were selected for
        regeneration.
      </p>
      <ReductionSelfCheckGPT data={modelData.reduction_selfcheck} />
      <p>
        The top 10 deltas on each side of the distribution were selected for
        human annotation to determine if the new summary was actually better or
        worse as evaluated by SelfCheckGPT. It is annotated as the value 1 if
        the delta is in the correct direction, and 0 if it is not.
      </p>
      <ConfusionMatrix
        data={modelData.annotated_reduction_selfcheck}
        title="SelfCheckGPT Reduction"
        better="negative"
      />
      <span className="mt-4 text-zinc-400 leading-tight lg:hidden">
        Table hidden on mobile view.
      </span>
      <ScrollArea className="mt-4 h-[800px] w-full hidden lg:block">
        <Table>
          <TableHeader>
            {[
              "Context",
              "Original Summaries",
              "New Summary",
              "Score Delta",
              "Human Annotation",
            ].map((header) => (
              <TableHead key={header} className="bg-zinc-950">
                {header}
              </TableHead>
            ))}
          </TableHeader>
          <TableBody>
            {modelData.annotated_reduction_selfcheck &&
              modelData.annotated_reduction_selfcheck.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.original}</TableCell>
                  <TableCell>
                    {row.old_summaries.map((x) => (
                      <>
                        {x}
                        <br />
                        <br />
                      </>
                    ))}
                  </TableCell>
                  <TableCell>{row.new_summary}</TableCell>
                  <TableCell>{row.score_delta}</TableCell>
                  <TableCell>{row.human_annotation}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default Results;
