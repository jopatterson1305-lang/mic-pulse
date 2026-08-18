import { ContentManager } from "@/components/admin/ContentManager";

export default function EventsAdminPage() {
  return <ContentManager table="events" title="Events" eyebrow="CONTENT / EVENTS" description="Manage the conversations, launches and gatherings shaping East Africa." fields={[{ key: "title", label: "Title" }, { key: "description", label: "Description", type: "textarea" }, { key: "venue", label: "Venue" }, { key: "location", label: "Location" }, { key: "starts_at", label: "Start date", type: "datetime-local" }, { key: "end_at", label: "End date", type: "datetime-local" }, { key: "registration_url", label: "Registration URL", type: "url" }, { key: "url", label: "Event URL", type: "url" }]} />;
}
