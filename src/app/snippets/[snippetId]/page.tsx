import { deleteSnippet } from "@/actions";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SnippetPreviewProps {
  params: {
    snippetId: string;
  };
}

export default async function SnippetPreview(props: SnippetPreviewProps) {
  const theSnippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.snippetId) },
  });

  if (!theSnippet) return notFound();
  const deleteSnippetAction = deleteSnippet.bind(null, theSnippet.id);
  return (
    <div className="my-3">
      <h1>{theSnippet?.title}</h1>
      <div className="flex justify-end gap-4 my-2">
        <Link
          href={`/snippets/${theSnippet.id}/edit `}
          className="border p-2 rounded"
        >
          Edit
        </Link>
        <form action={deleteSnippetAction}>
          <button className="border p-2 rounded">Delete</button>
        </form>
      </div>
      <pre className="border rounded bg-gray-200 p-10">
        <code>{theSnippet?.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  //use this func to enable caching system in dynamic files, in order to enhance next app performance
  const snippets = await db.snippet.findMany();
  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
