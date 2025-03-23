"use client";
import { useRouter } from "next/navigation";
import { atom, useAtom } from "jotai";

export const NAVIGATION_DURATION = 300;

// Define atoms for our state
const isOpenAtom = atom<boolean>(false);
const shouldCloseAtom = atom<boolean>(false);

export const useLayoutNavigation = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [shouldClose, setShouldClose] = useAtom(shouldCloseAtom);

  const push = (name: string) => {
    router.push(name);
  };

  const open = () => {
    setIsOpen(true);
    setShouldClose(true);
  };

  const close = () => {
    if (shouldClose) {
      setIsOpen(false);
      setTimeout(() => {
        router.back();
      }, NAVIGATION_DURATION);
    }
  };

  return { isOpen, open, close, push, setIsOpen, shouldClose };
};
