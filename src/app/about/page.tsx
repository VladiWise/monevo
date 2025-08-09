import { Button } from "@/components/Button";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CommonMainLayout } from "@/components/CommonMainLayout";

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
      <section className=" text-lg gap-3 flex flex-col">
        <h2 className="text-3xl font-bold">Overview</h2>
        <p className="text-lg dark:text-slate-400">
          Hi, fellas! I&apos;m a novice software engineer with about 6 months of
          experience writing code. Now I&apos;m going to introduce you to my pet
          project. That&apos;s an investment tracker. Developed a full-stack,
          progressive web application designed to help users monitor their
          investment portfolios.
        </p>
      </section>

      {/* Technologies Used Section */}
      <section className=" text-lg gap-3 flex flex-col ">
        <h2 className="text-3xl font-bold">Technologies Used</h2>
        <ul className="list-none flex flex-col gap-2 dark:text-slate-400">
          {INFO.map((item) => (
            <li key={item.title}>
              <span className="font-semibold">
                {item.title}:{" "}
              </span>
              {item.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="text-lggap-3 flex flex-col">
        <h2 className="text-3xl font-bold">
          How to try this out
        </h2>
        <p className=" dark:text-slate-400">
          Use these credentials to test this app: email:{" "}
          <strong className="text-primary">monevo@example.com</strong>, password: <strong className="text-primary">123456</strong>
        </p>
        <form
          action={async () => {
            "use server";
            if (isUser) {
              redirect("/client/home");
            } else {
              redirect("/auth/login");
            }
          }}
        >
          {/* <Button variant="darkMain" type="submit">
            Log in to Monevo
          </Button> */}
        </form>

        {/* <Image
          src={"/Install_Monevo.png"}
          alt={"user"}
          width={300}
          height={100}
        /> */}
      </section>
    </div>
  );
}
export default async function AboutPage() {
  const user = await getCurrentUser();

  // if (user) redirect("/client/home");
  return (
    <>

      
      <CommonMainLayout>

      <Page isUser={!!user} />

      </CommonMainLayout>




    </>
  );
}
