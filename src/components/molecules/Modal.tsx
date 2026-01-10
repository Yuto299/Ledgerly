"use client";

import { ReactNode } from "react";
import Button from "@/components/atoms/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button variant="outline" onClick={onClose} className="text-gray-500">
            ✕
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
