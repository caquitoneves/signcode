import { VideoOff } from 'lucide-react';
import type { LessonVideo } from '@projetox/contracts';
import { cn } from '@projetox/ui';

function embedSrc(video: LessonVideo, autoplay: boolean, muted: boolean): string | null {
  if (video.provider === 'youtube') {
    const params = new URLSearchParams({
      rel: '0',
      playsinline: '1',
      fs: '0',
      modestbranding: '1',
    });
    if (autoplay) params.set('autoplay', '1');
    if (muted) params.set('mute', '1');
    return `https://www.youtube.com/embed/${video.externalId}?${params.toString()}`;
  }
  return null;
}

function Placeholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="status"
      className={cn(
        'flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-edge bg-elevated text-muted',
        className,
      )}
    >
      <VideoOff className="h-6 w-6" aria-hidden="true" />
      <span className="px-2 text-center text-xs">{label}</span>
    </div>
  );
}

export function VideoEmbed({
  video,
  title,
  autoplay = false,
  muted = false,
  className,
}: {
  video: LessonVideo | null;
  title: string;
  autoplay?: boolean;
  muted?: boolean;
  className?: string;
}) {
  if (!video) return <Placeholder label="Vídeo indisponível." className={className} />;
  const src = embedSrc(video, autoplay, muted);
  if (!src)
    return (
      <Placeholder label={`Provedor não suportado (${video.provider}).`} className={className} />
    );

  return (
    <div
      className={cn(
        'aspect-video w-full overflow-hidden rounded-xl border border-edge bg-black shadow-lg',
        className,
      )}
    >
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="h-full w-full"
      />
    </div>
  );
}
