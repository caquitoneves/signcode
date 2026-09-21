import type { LessonVideo } from '@projetox/contracts';

function embedSrc(video: LessonVideo): string | null {
  if (video.provider === 'youtube') {
    return `https://www.youtube.com/embed/${video.externalId}`;
  }
  return null;
}

export function VideoEmbed({ video, title }: { video: LessonVideo | null; title: string }) {
  if (!video) {
    return (
      <div
        role="status"
        className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-100 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
      >
        Vídeo indisponível para este idioma.
      </div>
    );
  }

  const src = embedSrc(video);
  if (!src) {
    return (
      <div
        role="status"
        className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-100 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
      >
        Provedor de vídeo não suportado ({video.provider}).
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
