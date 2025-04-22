import Link from "next/link";

export default function Home() {
  return (
    <div className=" bg-[url('/images/home-bg.jpg')] bg-cover bg-center">
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 rounded-xl bg-gray-950/90 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl">
          <h1 className="text-4xl font-bold">
            Abd&apos;s Computer <br /> Repair Shops
          </h1>
          <address>
            <p>123 Main St</p>
            <p>Anytown, USA</p>
            <p>123-456-7890</p>
          </address>
          <p>Open Daily: 9 AM - 5 PM</p>
          <Link href="tel:+962790407986" className="underline">
            +962790407986
          </Link>
        </div>
      </main>
    </div>
  );
}
