import { VideoOff } from 'lucide-react';
import type { LessonVideo } from '@projetox/contracts';

type Aspect = 'video' | 'portrait';

const ASPECT: Record<Aspect, string> = {
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
};

function embedSrc(video: LessonVideo, autoplay: boolean, muted: boolean): string | null {
  if (video.provider === 'youtube') {
    const params = new URLSearchParams({ rel: '0', playsinline: '1' });
    if (autoplay) params.set('autoplay', '1');
    if (muted) params.set('mute', '1');
    return `https://www.youtube.com/embed/${video.externalId}?${params.toString()}`;
  }
  return null;
}

function Placeholder({ aspectClass, label }: { aspectClass: string; label: string }) {
  return (
    <div
      role="status"
      className={`flex ${aspectClass} w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-edge bg-elevated text-muted`}
    >
      <VideoOff className="h-7 w-7" aria-hidden="true" />
      <span className="px-2 text-center text-sm">{label}</span>
    </div>
  );
}

export function VideoEmbed({
  video,
  title,
  autoplay = false,
  muted = false,
  aspect = 'video',
}: {
  video: LessonVideo | null;
  title: string;
  autoplay?: boolean;
  muted?: boolean;
  aspect?: Aspect;
}) {
  const aspectClass = ASPECT[aspect];
  if (!video) return <Placeholder aspectClass={aspectClass} label="Vídeo indisponível." />;
  const src = embedSrc(video, autoplay, muted);
  if (!src)
    return (
      <Placeholder
        aspectClass={aspectClass}
        label={`Provedor não suportado (${video.provider}).`}
      />
    );

  return (
    <div
      className={`${aspectClass} w-full overflow-hidden rounded-2xl border border-edge bg-black shadow-xl`}
    >
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
