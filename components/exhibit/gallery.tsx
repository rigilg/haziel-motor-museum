"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { MediaAsset } from "@/lib/vehicles";

export function Gallery({ media }: { media: MediaAsset[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);
  const current = media[index];
  function close() {
    dialog.current?.close();
  }
  return (
    <>
      <div className="exhibit-gallery">
        {media.map((asset, i) => (
          <figure key={asset.id}>
            <button
              className="gallery-open"
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setIndex(i);
                dialog.current?.showModal();
              }}
              aria-label={`Enlarge: ${asset.title}`}
              aria-haspopup="dialog"
            >
              <Image
                src={asset.src}
                alt={asset.alt}
                width={asset.width}
                height={asset.height}
                sizes="(max-width: 700px) 100vw, 33vw"
              />
              <span aria-hidden="true">View photograph ↗</span>
            </button>
            <figcaption>
              <strong>{asset.title}</strong>
              <p>{asset.caption}</p>
              <a href={`#credit-${asset.id}`}>
                {asset.creator} · {asset.license}
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-labelledby="photo-title"
        onClose={() => trigger.current?.focus()}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            setIndex((index + 1) % media.length);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            setIndex((index + media.length - 1) % media.length);
          }
        }}
      >
        <div className="photo-dialog-inner">
          <div className="photo-toolbar">
            <span aria-live="polite">
              Photograph {index + 1} / {media.length}
            </span>
            <button onClick={close} autoFocus>
              Close ×
            </button>
          </div>
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="95vw"
          />
          <div aria-live="polite">
            <h3 id="photo-title">{current.title}</h3>
            <p>{current.caption}</p>
            <a href={current.sourceUrl}>{current.creator}</a> ·{" "}
            <a href={current.licenseUrl}>{current.license}</a>
          </div>
          <div className="photo-controls">
            <button
              onClick={() =>
                setIndex((index + media.length - 1) % media.length)
              }
            >
              ← Previous
            </button>
            <button onClick={() => setIndex((index + 1) % media.length)}>
              Next →
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
