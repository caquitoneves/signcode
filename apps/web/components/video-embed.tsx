import { VideoOff } from 'lucide-react';
import type { LessonVideo } from '@signcode/contracts';
import { cn } from '@signcode/ui';

function youtubeSrc(video: LessonVideo, autoplay: boolean, muted: boolean): string {
  const params = new URLSearchParams({ rel: '0', playsinline: '1', fs: '0', modestbranding: '1' });
  if (autoplay) params.set('autoplay', '1');
  if (muted) params.set('mute', '1');
  return `https://www.youtube.com/embed/${video.externalId}?${params.toString()}`;
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
  controls = false,
  className,
  videoRef,
}: {
  video: LessonVideo | null;
  title: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  videoRef?: (el: HTMLVideoElement | null) => void;
}) {
  if (!video) return <Placeholder label="Vídeo indisponível." className={className} />;

  const box = cn(
    'aspect-video w-full overflow-hidden rounded-xl border border-edge bg-black shadow-lg',
    className,
  );

  if (video.provider === 'youtube') {
    return (
      <div className={box}>
        <iframe
          src={youtubeSrc(video, autoplay, muted)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="h-full w-full"
        />
      </div>
    );
  }

  // provider "file" (ou qualquer URL direta de vídeo) -> <video> controlável
  return (
    <div className={box}>
      <video
        ref={videoRef}
        src={video.externalId}
        title={title}
        controls={controls}
        autoPlay={autoplay}
        muted={muted}
        playsInline
        preload="metadata"
        controlsList="nofullscreen"
        className="h-full w-full bg-black"
      />
    </div>
  );
}
