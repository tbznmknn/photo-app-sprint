import Link from "next/link";
import React from "react";

export default function Notfound() {
  return (
    <section className="">
      <div className="mx-auto flex flex-col justify-center items-center px-4 py-6 sm:px-6 lg:px-8">
        <h3 className="mb-3 text-lg sm:text-xl md:text-2xl">Дата олдсонгүй</h3>

        <iframe
          src="https://giphy.com/embed/g01ZnwAUvutuK8GIQn"
          className="w-full h-[300px] sm:h-[400px] lg:h-[500px] max-w-[800px]"
          allowFullScreen
        ></iframe>

        <p className="mt-2 mb-3 text-sm sm:text-base">
          <a
            href="https://giphy.com/gifs/high-quality-highqualitygifs-g01ZnwAUvutuK8GIQn"
            className="text-blue-500 hover:underline"
          >
            source: GIPHY
          </a>
        </p>

        <p className="mb-3 text-sm sm:text-base text-center">
          Уучлаарай, таны хайж байсан пэйж хуудсыг олсонгүй. Танийг нүүр хуудас
          руу очихыг зөвлөж байна.
        </p>

        <Link
          href="/"
          className="btn btn-primary d-flex align-items-center justify-content-center mx-auto px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm"
        >
          БУЦАХ
        </Link>
      </div>
    </section>
  );
}
