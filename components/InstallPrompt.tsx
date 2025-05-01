'use client';
import { useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const InstallPrompt = () => {
  useEffect(() => {
    let deferredPrompt: BeforeInstallPromptEvent | null = null;

    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;

      deferredPrompt.prompt();
      // if (confirm('Do you want to install this app?')) {
      //   deferredPrompt.userChoice.then(choiceResult => {
      //     console.log('User choice:', choiceResult.outcome);
      //   });
      // }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  return null;
};

export default InstallPrompt;
