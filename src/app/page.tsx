import { Form } from "@/components/form";
import { UserList } from "@/components/user-list";

// get submitted logs

// async function getLogs() {
//   const res = await fetch("url");
//   if (!res.ok) {
//     throw new Error("Opps! Something went wrong");
//   }
//   return res.json();
// }

export default function Home() {
  return (
    <main className="flex  flex-col gap-10 sm:w-1/2 sm:m-auto max-w-3xl">
      <Form />
      <UserList />
    </main>
  );
}
