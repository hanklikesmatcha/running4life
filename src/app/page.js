import { auth } from "@/auth";
import ClientHome from "@/components/QueryClientHome";

export default async function Page() {
  const session = await auth();

  return <ClientHome session={session} />;
}
