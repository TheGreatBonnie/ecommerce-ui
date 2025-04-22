"use client";

import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import type React from "react";

interface LeafyGreenWrapperProps {
  children: React.ReactNode;
}

export function LeafyGreenWrapper({ children }: LeafyGreenWrapperProps) {
  return <LeafyGreenProvider>{children}</LeafyGreenProvider>;
}
