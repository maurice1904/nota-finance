import RatgeberSeite from "@/components/RatgeberSeite";
import { ratgeberContent } from "@/lib/ratgeber-content";

export default function RechnungImVerzugPage() {
  return <RatgeberSeite content={ratgeberContent["rechnung-im-verzug"]} />;
}
