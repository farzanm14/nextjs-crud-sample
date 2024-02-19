"use client";
import { editSnippet } from "@/actions";
import { Editor } from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { startTransition, useState } from "react";

interface SnippetEditFormProps {
  snippet: Snippet;
}
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  //solution number
  const editSnippetAction = editSnippet.bind(null, snippet.id, code); // a version of server action thats preloaded up with all  the required arguments

  //solution number 2
  const onSubmitForm = async () => {
    console.log("onsubmitform called");
    await startTransition(() => {
      editSnippet(snippet.id, code);
    });
  };

  return (
    <div className="my-3">
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{
          minimap: { enabled: false },
        }}
        onChange={handleEditorChange}
      />

      {/* solution2: <button type="submit" className="border p-2 rounded" onClick={onSubmitForm}>submit changes</button> */}
      <form action={editSnippetAction}>
        <button type="submit" className="border p-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
