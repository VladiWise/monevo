import { Button } from "@/components/Button";
import { LoginButton } from "@/components/auth/LoginButton";
import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import Image from "next/image";
import { redirect } from "next/navigation";
function Page({ isUser }: { isUser: boolean }) {
  const INFO = [
    {
      title: "Next.js 15",
      description:
        "Leveraged Next.js 15 with TypeScript for a robust, scalable codebase, ensuring efficient rendering and a seamless user experience.",
    },
    {
      title: "Tailwind CSS",
      description:
        "Utilized Tailwind CSS to craft a modern, responsive design that adapts smoothly across devices.",
    },
    {
      title: "Zustand",
      description:
        "Implemented Zustand for showing notifications in real-time.",
    },
    {
      title: "MongoDB",
      description:
        "Integrated MongoDB for a flexible solution to handle user data.",
    },
    {
      title: "PWA Features",
      description:
        "Built as a Progressive Web App to provide, faster load times, and an app-like experience across both mobile and desktop platforms (offline mode is not working yet).",
    },
    {
      title: "SSR",
      description:
        "Server-Side Rendering, is a technique where web pages are rendered on the server instead of in the browser.",
    },
  ];
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      {/* Overview Section */}
      <section className=" text-lg text-gray-700 gap-3 flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800">Overview</h2>
        <p className="text-lg text-gray-700">
          Hi, fellas! I&apos;m a novice software engineer with about 6 months of
          experience writing code. Now I&apos;m going to introduce you to my pet
          project. That&apos;s an investment tracker. Developed a full-stack,
          progressive web application designed to help users monitor their
          investment portfolios.
        </p>
      </section>

      {/* Technologies Used Section */}
      <section className=" text-lg text-gray-700 gap-3 flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800">Technologies Used</h2>
        <ul className="list-none flex flex-col gap-2">
          {INFO.map((item) => (
            <li key={item.title}>
              <span className="font-semibold text-gray-800">
                {item.title}:{" "}
              </span>
              {item.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="text-lg text-gray-700 gap-3 flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800">
          How to try this out
        </h2>
        <p>
          Use these credentials to test this app: email:{" "}
          <strong>monevo@example.com</strong>, password: <strong>123456</strong>
        </p>
        <form
          action={async () => {
            "use server";
            isUser && redirect("/client/home");
            !isUser && redirect("/auth/login");
          }}
        >
          <Button variant="secondary" type="submit">
            Log in to Monevo
          </Button>
        </form>
        Also you can install this app on your phone or PC as a PWA (Progressive
        Web App).
        <Image
          src={"/Install_Monevo.png"}
          alt={"user"}
          width={300}
          height={100}
        />
      </section>
    </div>
  );
}
export default async function MainPage() {
  const user = await getCurrentUser();

  // if (user) redirect("/client/home");
  return (
    <>
      <Header />

      {!user && (
        <main className="flex flex-col  h-full min-h-fit w-full pb-16 sm:pt-4 sm:px-4 md:p-4 md:pt-20 overflow-x-hidden">
          <Page isUser={!!user} />
        </main>
      )}

      {user && (
        <>
          <Navbar />

          <main className="flex flex-col  h-full min-h-fit w-full pb-16 sm:pt-4 sm:px-4 md:pb-4 md:pl-[12rem] md:pt-20 overflow-x-hidden">
            <Page isUser={!!user} />
          </main>
        </>
      )}
    </>
  );
}
