import { SimpleResourceManager } from "@/components/admin/SimpleResourceManager";

export default function PagesAdminPage() { return <SimpleResourceManager table="pages" title="Pages" eyebrow="PUBLISHING / PAGES" description="Edit evergreen MIC pages without touching the application source." fields={[{ key: "title", label: "Title" }, { key: "slug", label: "Slug" }, { key: "content", label: "Content", type: "textarea" }]} />; }
