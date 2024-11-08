import Image from "next/image";
import { api } from "../_trpc/server";

export default async function Home() {
  const hello = await api.helloWorld.hello({ text: "from tRPC Backend" });
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <a className="text-xl">Template</a>
        <ol className="list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">{hello.greeting}</li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="https://github.com/KM-drago" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/github-mark-white.svg" alt="Globe icon" width={16} height={16} />
          KM-drago
        </a>
      </footer>
    </div>
  );
}
