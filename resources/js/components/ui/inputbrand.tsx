import { cn } from "@/lib/utils"

export default function InputBrand({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input type={type}
            className={cn("mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1", className)}
            {...props}
        />
    )
}