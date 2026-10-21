import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/user_/login")({
  beforeLoad: () => { throw redirect({ to: "/login" }); },
});
