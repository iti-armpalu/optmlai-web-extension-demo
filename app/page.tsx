import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-start bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col gap-8 py-32 px-32 bg-white dark:bg-black sm:items-start">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold tracking-tight text-balance">Premium Audio Experience</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Discover the perfect sound with cutting-edge technology and timeless design. Engineered for those who demand
            excellence.
          </p>
        </div>

        {/* Content Section with Image */}
        <div className="flex flex-col gap-6">
          <p className="text-lg leading-relaxed">
            Experience audio like never before. Our products combine innovative engineering with superior craftsmanship
            to deliver unparalleled sound quality that transforms the way you listen to music.
          </p>

          <div>
            <Image
              src="https://images.squarespace-cdn.com/content/v1/5ef0ef1b02a1d05e6faff7ac/1593379290858-GI2TYZN1I701KK95J8W2/Ad_page_01.jpg"
              alt="Bose advertising"
              width={600}
              height={800}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
