import { ContentManager } from "@/components/admin/ContentManager";

export default function OpportunitiesAdminPage() {
  return <ContentManager table="opportunities" title="Opportunities" eyebrow="CONTENT / OPPORTUNITIES" description="Manage scholarships, funding, grants, jobs and openings published through MIC." fields={[{ key: "title", label: "Title" }, { key: "description", label: "Description", type: "textarea" }, { key: "organization", label: "Organization" }, { key: "type", label: "Type" }, { key: "deadline", label: "Deadline", type: "datetime-local" }, { key: "location", label: "Location" }, { key: "url", label: "URL", type: "url" }]} />;
}
