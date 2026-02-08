"use client";

import { useState } from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface PasswordFieldProps {
  label: string;
  placeholder?: string;
  description?: string;
  field: ControllerRenderProps<FieldValues, string>;
}

export function PasswordField({
  label,
  placeholder,
  description,
  field,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <FormItem className="space-y-1.5">
      <FormLabel>{label}</FormLabel>
      {description ? <FormDescription>{description}</FormDescription> : null}
      <div className="relative">
        <FormControl>
          <Input
            type={visible ? "text" : "password"}
            placeholder={placeholder}
            className="pr-10"
            {...field}
          />
        </FormControl>
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground transition hover:bg-muted"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      <FormMessage />
    </FormItem>
  );
}

export function GoogleButton({ label }: { label: string }) {
  const [busy, setBusy] = useState(false);

  const GoogleMark = (
    <svg
      aria-hidden="true"
      focusable="false"
      className="size-4"
      viewBox="0 0 18 18"
    >
      <path
        d="M17.64 9.2045c0-.6395-.0573-1.2527-.1636-1.8409H9v3.4818h4.8445c-.209 1.125-.8436 2.0782-1.7973 2.7173v2.2618h2.9082c1.7018-1.5673 2.6846-3.8745 2.6846-6.62Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.4673-.8064 5.9563-2.1755l-2.9082-2.2618c-.8063.54-1.8373.8618-3.0481.8618-2.3446 0-4.3282-1.5827-5.0346-3.71H.957v2.3328C2.4382 15.9836 5.4818 18 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.9654 10.7145c-.18-.54-.2823-1.1155-.2823-1.7145 0-.5991.1023-1.1745.2823-1.7145V4.9527H.957C.3477 6.1636 0 7.5454 0 9c0 1.4546.3477 2.8364.957 4.0473l3.0084-2.3328Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.5791c1.3218 0 2.5064.4545 3.4391 1.3436l2.579-2.579C13.4636.9155 11.4264 0 9 0 5.4818 0 2.4382 2.0164.957 4.9527l3.0084 2.3328C4.6718 5.1618 6.6554 3.5791 9 3.5791Z"
        fill="#EA4335"
      />
    </svg>
  );

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full justify-center border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50"
      onClick={() => {
        setBusy(true);
        setTimeout(() => setBusy(false), 900);
      }}
      disabled={busy}
    >
      {busy ? <Loader2 className="size-4 animate-spin" /> : GoogleMark}
      <span>{label}</span>
    </Button>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <Separator className="flex-1" />
      <span>or</span>
      <Separator className="flex-1" />
    </div>
  );
}
