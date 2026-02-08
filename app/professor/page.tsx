import { redirect } from "next/navigation";

const PREVIEW_PROFESSOR_ID = 123456;

export default function ProfessorIndexPage() {
  redirect(`/professor/${PREVIEW_PROFESSOR_ID}`);
}
