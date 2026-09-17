"use client";

import { ReactNode } from "react";
import { PlanProvider } from "./PlanContext";

export function ClientProviders({ children }: { children: ReactNode }) {
  return <PlanProvider>{children}</PlanProvider>;
}