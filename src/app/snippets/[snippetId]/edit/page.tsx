import SnippetEditForm from "@/components/snippetEditForm";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetEditPageProps {
  params: {
    snippetId: string;
  };
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const theId = parseInt(props.params.snippetId);
  const theSnippet = await db.snippet.findFirst({
    where: { id: theId },
  });

  if (!theSnippet) return notFound();
  return (
    <div>
      <h1>EDIT SNIPPET title: {theSnippet.title}</h1>
      <SnippetEditForm snippet={theSnippet} />
    </div>
  );
}
