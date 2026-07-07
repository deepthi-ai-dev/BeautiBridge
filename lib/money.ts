import { rupeeFormatter } from "@/lib/formatters";

export function formatPaise(paise: number) {
  return rupeeFormatter.format(paise / 100);
}
