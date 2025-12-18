import type { LucideIcon } from "lucide-react"
import {
  AlignLeft,
  BarChart3,
  Calendar,
  CheckSquare,
  ChevronDown,
  Circle,
  Clock,
  FileOutput,
  Gauge,
  Hash,
  Link,
  Lock,
  Mail,
  Palette,
  Phone,
  Search,
  Type,
  Upload,
} from "lucide-react"
import type { TFieldType, TFieldValueType } from "../models"

type FieldTemplate = {
  type: TFieldType
  label: string
  placeholder?: string
  defaultValue?: TFieldValueType
  options?: Array<{ label: string; value: string | number }>
  icon: LucideIcon
  color: string
}

export const FIELD_GROUPS: Record<string, FieldTemplate[]> = {
  "Text Inputs": [
    {
      type: "text",
      label: "Text Field",
      placeholder: "Enter text...",
      defaultValue: "",
      icon: Type,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      type: "email",
      label: "Email Address",
      placeholder: "your@email.com",
      defaultValue: "",
      icon: Mail,
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      type: "password",
      label: "Password",
      placeholder: "Enter password...",
      defaultValue: "",
      icon: Lock,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      type: "url",
      label: "URL",
      placeholder: "https://example.com",
      defaultValue: "",
      icon: Link,
      color: "bg-cyan-500 hover:bg-cyan-600",
    },
    {
      type: "tel",
      label: "Phone Number",
      placeholder: "+1 (555) 000-0000",
      defaultValue: "",
      icon: Phone,
      color: "bg-teal-500 hover:bg-teal-600",
    },
    {
      type: "search",
      label: "Search Field",
      placeholder: "Search...",
      defaultValue: "",
      icon: Search,
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      type: "textarea",
      label: "Text Area",
      placeholder: "Enter long text...",
      defaultValue: "",
      icon: AlignLeft,
      color: "bg-violet-500 hover:bg-violet-600",
    },
  ],
  "Number Inputs": [
    {
      type: "number",
      label: "Number",
      placeholder: "0",
      defaultValue: 0,
      icon: Hash,
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
    {
      type: "range",
      label: "Range Slider",
      defaultValue: 0,
      icon: BarChart3,
      color: "bg-green-500 hover:bg-green-600",
    },
  ],
  "Date & Time": [
    {
      type: "date",
      label: "Date Picker",
      defaultValue: "",
      icon: Calendar,
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      type: "datetime-local",
      label: "Date & Time",
      defaultValue: "",
      icon: Calendar,
      color: "bg-amber-500 hover:bg-amber-600",
    },
    {
      type: "time",
      label: "Time Picker",
      defaultValue: "",
      icon: Clock,
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      type: "month",
      label: "Month Picker",
      defaultValue: "",
      icon: Calendar,
      color: "bg-lime-500 hover:bg-lime-600",
    },
    {
      type: "week",
      label: "Week Picker",
      defaultValue: "",
      icon: Calendar,
      color: "bg-rose-500 hover:bg-rose-600",
    },
  ],
  Selection: [
    {
      type: "checkbox",
      label: "Checkbox",
      defaultValue: false,
      icon: CheckSquare,
      color: "bg-pink-500 hover:bg-pink-600",
    },
    {
      type: "radio",
      label: "Radio Group",
      defaultValue: "",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ],
      icon: Circle,
      color: "bg-fuchsia-500 hover:bg-fuchsia-600",
    },
    {
      type: "select",
      label: "Dropdown",
      defaultValue: "",
      options: [
        { label: "Select an option", value: "" },
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ],
      icon: ChevronDown,
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      type: "select-multiple",
      label: "Multi-select",
      defaultValue: [],
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ],
      icon: ChevronDown,
      color: "bg-slate-500 hover:bg-slate-600",
    },
    {
      type: "datalist",
      label: "Datalist",
      placeholder: "Type or select...",
      defaultValue: "",
      options: [
        { label: "Suggestion 1", value: "suggestion1" },
        { label: "Suggestion 2", value: "suggestion2" },
        { label: "Suggestion 3", value: "suggestion3" },
      ],
      icon: ChevronDown,
      color: "bg-stone-500 hover:bg-stone-600",
    },
  ],
  Other: [
    {
      type: "color",
      label: "Color Picker",
      defaultValue: "#000000",
      icon: Palette,
      color: "bg-gray-500 hover:bg-gray-600",
    },
    {
      type: "file",
      label: "File Upload",
      defaultValue: null,
      icon: Upload,
      color: "bg-zinc-500 hover:bg-zinc-600",
    },
    {
      type: "progress",
      label: "Progress Bar",
      defaultValue: 0,
      icon: BarChart3,
      color: "bg-neutral-500 hover:bg-neutral-600",
    },
    {
      type: "meter",
      label: "Meter",
      defaultValue: 0,
      icon: Gauge,
      color: "bg-blueGray-500 hover:bg-blueGray-600",
    },
    {
      type: "output",
      label: "Output",
      defaultValue: "",
      icon: FileOutput,
      color: "bg-warmGray-500 hover:bg-warmGray-600",
    },
  ],
}
