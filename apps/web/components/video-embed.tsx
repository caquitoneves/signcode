import { VideoOff } from 'lucide-react';
import type { LessonVideo } from '@projetox/contracts';

function embedSrc(video: LessonVideo): string | null {
  if (video.provider === 'youtube') {
    return `https://www.youtube.com/embed/${video.externalId}`;
  }
  return null;
}

function Placeholder({ label }: { label: string }) {
  return (
    <div
      role="status"
      className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-edge bg-elevated text-muted"
    >
      <VideoOff className="h-8 w-8" aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function VideoEmbed({ video, title }: { video: LessonVideo | null; title: string }) {
  if (!video) return <Placeholder label="Vídeo indisponível para este idioma." />;
  const src = embedSrc(video);
  if (!src) return <Placeholder label={`Provedor não suportado (${video.provider}).`} />;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-edge bg-black shadow-xl">
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
