"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}

export function Modal({ isOpen, onClose, title, children, wide }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0 sm:items-center sm:p-5"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className={`w-full rounded-t-2xl border border-white/[0.08] bg-[#111] shadow-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto animate-in ${wide ? "sm:max-w-3xl" : "sm:max-w-md"}`}>
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <h3 className="text-[14px] font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">{children}</div>
      </div>
    </div>
  );
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormInput({ label, className, ...props }: FormInputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-zinc-400">
        {label}
      </label>
      <input
        className={cn(
          "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/[0.15] focus:bg-white/[0.06]",
          className
        )}
        {...props}
      />
    </div>
  );
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

export function FormSelect({
  label,
  children,
  className,
  ...props
}: FormSelectProps) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-[13px] font-medium text-zinc-400">
          {label}
        </label>
      )}
      <select
        className={cn(
          "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-all focus:border-white/[0.15] focus:bg-white/[0.06]",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function FormTextarea({
  label,
  className,
  ...props
}: FormTextareaProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-zinc-400">
        {label}
      </label>
      <textarea
        className={cn(
          "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/[0.15] focus:bg-white/[0.06]",
          className
        )}
        rows={3}
        {...props}
      />
    </div>
  );
}

export function ModalActions({
  onClose,
  submitLabel = "Save",
}: {
  onClose: () => void;
  submitLabel?: string;
}) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <Button variant="outline" size="sm" onClick={onClose} type="button">
        Cancel
      </Button>
      <Button size="sm" type="submit">
        {submitLabel}
      </Button>
    </div>
  );
}
