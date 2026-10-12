"use client";

import SolutionFlowPipeline, { FlowItem } from "./SolutionFlowPipeline";

export type { FlowItem };

interface SolutionFlowGridProps {
  items: FlowItem[];
  metricLabel?: string;
  flowStageTitle?: string;
}

export default function SolutionFlowGrid({
  items,
  metricLabel,
  flowStageTitle,
}: SolutionFlowGridProps) {
  return (
    <SolutionFlowPipeline
      items={items}
      metricLabel={metricLabel}
      flowStageTitle={flowStageTitle}
    />
  );
}
