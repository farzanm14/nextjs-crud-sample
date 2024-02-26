"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void; //allow us to automatically refresh our route, usually we add a button to call it
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return <div>{error.message}</div>;
}
