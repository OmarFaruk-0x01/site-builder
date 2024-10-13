import { ReactNode } from "react";

export type NodeSettingType = {
  id: string;
  title: string;
  Placeholder: () => ReactNode;
  render: () => ReactNode;
};
