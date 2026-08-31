import Image from "next/image";
import type { Media } from "@/content/types";

export function EntryMedia({ media }: { media: Media }) {
  if (media.kind === "video" && media.src) {
    return (
      <figure className="entry-media">
        <video controls preload="metadata" playsInline poster={media.poster} aria-label={media.alt}>
          <source src={media.src} type="video/mp4" />
        </video>
        <figcaption>{media.caption}</figcaption>
      </figure>
    );
  }

  if (media.kind === "gallery" && media.sources) {
    return (
      <figure className="entry-media">
        <div className="media-gallery">
          {media.sources.map((source, index) => (
            <Image
              key={source}
              src={source}
              alt={`${media.alt}, view ${index + 1}`}
              width={1536}
              height={756}
              sizes="(max-width: 760px) 100vw, 33vw"
            />
          ))}
        </div>
        <figcaption>{media.caption}</figcaption>
      </figure>
    );
  }

  if (media.src) {
    return (
      <figure className={`entry-media${media.kind === "diagram" ? " diagram" : ""}`}>
        <Image
          src={media.src}
          alt={media.alt}
          width={960}
          height={840}
          sizes="(max-width: 760px) 100vw, 60vw"
        />
        <figcaption>{media.caption}</figcaption>
      </figure>
    );
  }

  return null;
}
