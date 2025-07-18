
import Link from "next/link";

interface project {
  id: number,
  title: string,
  imagePath: string,
  linkPath: string
}

export default function Home() {

  const projects: project[] = [
    {
      id: 1,
      imagePath: "/routing-photo-feed.png",
      title: "Routing Photo Feed",
      linkPath: "/routing-photo-feed"
    },
    {
      id: 2,
      imagePath: "/authentication-clerk.png",
      title: "Authentication clerk App",
      linkPath: "/authentication-clerk"
    },
    {
      id: 3,
      imagePath: "/aceternityui-music.png",
      title: "Aceternity Music Courses App",
      linkPath: "/aceternity-music"
    },
    {
      id: 4,
      imagePath: "/nextauth-verification.png",
      title: "Nextauth-Verification App",
      linkPath: "/nextauth-verification"
    },
  ]

  return (
    <div>
      <h1 className="text-4xl font-bold text-center dark:text-white my-8">
        Welcome to Project section
      </h1>
      <div className="flex flex-wrap justify-around items-center gap-8 mb-8">
        {
          projects.map((project, index) => (
          <Link
          key={project.id}
          href={project.linkPath}
          className="flex flex-col items-center bg-white hover:bg-[#dedede] dark:bg-[#525252] text-black dark:text-white p-4 rounded-lg shadow-lg dark:hover:bg-[#3a3a3a] transition-colors"
        >
          <img
            src={project.imagePath}
            alt="Project Image"
            className="mx-auto rounded-lg shadow-lg w-96 mb-4"
          />
          <h2 className=" text-xl font-bold">
            {project.title}
          </h2>
        </Link>
          ))
        }
               
      </div>

    </div>
  );
}
