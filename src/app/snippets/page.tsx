import { db } from "@/db";
import Link from "next/link";

export const dynamic = "force-dynamic"; //the page not be built-up at build time, on refresh just reserve again and again

export default async function SnippetsPage() {
  const snippets = await db.snippet.findMany(); // bring all snippets from db
  const renderSnippets = snippets.map((snippetItem) => {
    return (
      <div
        className="my-2 flex justify-between items-center p-2 border rounded gap-2 "
        key={snippetItem.id}
      >
        <header>{snippetItem.title}</header>
        <Link href={`/snippets/${snippetItem.id}`}>View</Link>
      </div>
    );
  });

  return (
    <div className="my-10">
      <div className="flex justify-between">
        <h1>All Snippets</h1>
        <Link className="border p-2 rounded" href={"/snippets/new"}>
          Add new one
        </Link>
      </div>
      {renderSnippets}
    </div>
  );
}
