import { db } from "@/db";
import { redirect } from "next/dist/client/components/navigation";
export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    //needs to be a server action
    "use server"; //non standard --> next treat with this func as a server action
    //run validation
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    //create a new record in db
    const newSnippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    //back to home page after creation
    console.log("newSnippet", newSnippet);

    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
