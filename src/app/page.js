import Image from "next/image";
import Link from "next/link";
import Network from "./components/Network";

export default async function Home() {
  return (
    <>
      <div className="wrapper-frame flex h-screen font-mono">
        <div className="w-1/3 bg-foreground pr-4">
          <div className="dots bg-background h-full borders-animation flex items-center px-8">
            <div className="space-y-6">
              <div className="rounded border bg-background border-black px-2 py-1 text-lg w-fit flex items-center gap-2">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(green-400) opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                </span>
                <p className="text-sm">MVP</p>
                {/* <button>Be an early contributor</button> */}
              </div>
              <div className="space-y-16">
                <div className="space-y-4">
                  <h1 className="text-5xl font-sans font-black tracking-tight upper">
                    Designers <span className="italic font-light">et al.</span>
                  </h1>
                  <div className="space-y-2">
                    <h2 className="text-lg w-11/12 leading-relaxed">
                      A map of design areas for designers to explore or to
                      designer friends to finally understand what they do.
                    </h2>
                    <p className="font-sans text-sm font-medium opacity-70">
                      Designed, developed and curated by{" "}
                      <Link
                        href="https://amarelodandara.vercel.app/"
                        className="underline underline-offset-2 font-mono"
                      >
                        Dandara
                      </Link>
                    </p>
                  </div>
                </div>

                <button className="cta bg-white/50 hover:bg-white/80 hover:scale-105 transition-all px-4 py-2 rounded font-mono font-medium inline-flex items-center gap-2 cursor-pointer">
                  Choose a field to start{" "}
                  <span className="inline-block">➝</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <p>Designed, developed and curated by Dandara</p>
        </div>
        <Network />
      </div>
    </>
  );
}
