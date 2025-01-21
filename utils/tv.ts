import { createTV } from "tailwind-variants";

import { twMergeConfig } from "@/utils/cn";

export type {
    VariantProps,
    ClassValue as TVClassValue,
} from "tailwind-variants";

export const tv = createTV({
    twMergeConfig,
});
