import type { PreviewId } from "@/lib/types";
import { KlyroPreview } from "./KlyroPreview";
import { LifeSnailPreview } from "./LifeSnailPreview";

export function Preview({ id }: { id: PreviewId }) {
  switch (id) {
    case "klyro":
      return <KlyroPreview />;
    case "lifesnail":
      return <LifeSnailPreview />;
    default:
      return null;
  }
}
