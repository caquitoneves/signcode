'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Sincroniza um vídeo "seguidor" (intérprete) com o vídeo principal:
 * play/pause/seek/velocidade propagam, e há correção de deriva.
 * Retorna callbacks de ref para anexar aos elementos <video>.
 */
export function useSyncedVideos(onEnded: () => void) {
  const mainRef = useRef<HTMLVideoElement | null>(null);
  const followerRef = useRef<HTMLVideoElement | null>(null);
  const endedRef = useRef(onEnded);
  endedRef.current = onEnded;
  const detach = useRef<(() => void) | null>(null);

  const setMain = useCallback((el: HTMLVideoElement | null) => {
    if (detach.current) {
      detach.current();
      detach.current = null;
    }
    mainRef.current = el;
    if (!el) return;

    const follower = () => followerRef.current;
    const onPlay = () => {
      const v = follower();
      if (v) {
        v.currentTime = el.currentTime;
        void v.play().catch(() => {});
      }
    };
    const onPause = () => follower()?.pause();
    const onSeeked = () => {
      const v = follower();
      if (v) v.currentTime = el.currentTime;
    };
    const onRate = () => {
      const v = follower();
      if (v) v.playbackRate = el.playbackRate;
    };
    const onTime = () => {
      const v = follower();
      if (v && Math.abs(v.currentTime - el.currentTime) > 0.4) v.currentTime = el.currentTime;
    };
    const onEnd = () => endedRef.current();

    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('seeked', onSeeked);
    el.addEventListener('ratechange', onRate);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('ended', onEnd);
    detach.current = () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('seeked', onSeeked);
      el.removeEventListener('ratechange', onRate);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('ended', onEnd);
    };
  }, []);

  const setFollower = useCallback((el: HTMLVideoElement | null) => {
    followerRef.current = el;
    const main = mainRef.current;
    if (el && main && !main.paused) {
      el.currentTime = main.currentTime;
      void el.play().catch(() => {});
    }
  }, []);

  useEffect(
    () => () => {
      if (detach.current) detach.current();
    },
    [],
  );

  return { setMain, setFollower };
}
