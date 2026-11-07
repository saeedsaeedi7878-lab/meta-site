import { MissingPage } from "@/components/missing-page";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <MissingPage />
    </PageShell>
  );
}