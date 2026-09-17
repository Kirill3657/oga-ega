"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PlanCtx = {
  selectedPlan: string;
  setSelectedPlan: (v: string) => void;
  selectPlanAndScroll: (v: string) => void;
};

const Ctx = createContext<PlanCtx | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [selectedPlan, setSelectedPlan] = useState("");

  function selectPlanAndScroll(plan: string) {
    setSelectedPlan(plan);
    if (typeof document !== "undefined") {
      document.getElementById("form")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  return (
    <Ctx.Provider value={{ selectedPlan, setSelectedPlan, selectPlanAndScroll }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}