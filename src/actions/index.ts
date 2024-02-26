"use server"; //all different functions that we define in this file, will treated as server actions by next js

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippets/${id}`);
}
export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  redirect(`/`);
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title  must be longer",
      };
    }
    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code  must be longer",
      };
    }
    // throw new Error("Failed to save to database");

    //create a new record in db
    const newSnippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log("newSnippet", newSnippet);
  } catch (error: unknown) {
    //we use form state hook instead displaying only an error screen (bad ux , user can't change anything in form )
    if (error instanceof Error)
      return {
        message: error.message,
      };
    else {
      return {
        message: "something went wrong",
      };
    }
  }
  // back to home page after creation
  redirect("/"); //This redirect should not appear in Try-Cache, because normally, when the redirect happens, NEXT thinks an error has occurred and displays the NEXT_REDIRECT error message.
}
