import type { LucideIcon } from "lucide-react";
import {
  Award,
  FileCheck,
  FilePlay,
  FileSpreadsheet,
  FileText,
  HelpCircle,
  Layers,
  Link,
  Users,
} from "lucide-react";

export type ViewId =
  | "default"
  | "sobre-oq"
  | "sobre-sas"
  | "pilotagem-protocolo"
  | "pilotagem-tabela"
  | "pilotagem-links"
  | "pilotagem-sessoes"
  | "pilotagem-videos"
  | "pilotagem-questionarios"
  | "pilotagem-uminho"
  | "gired-oq"
  | "gired-ia"
  | "gired-construir"
  | "gired-ideia";

export type NavItem = {
  view: ViewId;
  label: string;
  icon: LucideIcon;
  buttonClass: string;
};

export type NavGroup = {
  id: "sobre" | "pilotagem" | "gired";
  label: string;
  triggerClass: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "sobre",
    label: "Sobre o EA",
    triggerClass: "trigger-sobre",
    items: [
      {
        view: "sobre-oq",
        label: "O que é?",
        icon: HelpCircle,
        buttonClass: "sub-btn-sobre-oq",
      },
      {
        view: "sobre-sas",
        label: "SAs e Atividades",
        icon: Layers,
        buttonClass: "sub-btn-sobre-sas",
      },
    ],
  },
  {
    id: "pilotagem",
    label: "REDs",
    triggerClass: "trigger-pilotagem",
    items: [
      {
        view: "pilotagem-protocolo",
        label: "Protocolo de Pilotagem",
        icon: FileText,
        buttonClass: "sub-btn-pilotagem-protocolo",
      },
      {
        view: "pilotagem-tabela",
        label: "Tabela Pilotagem",
        icon: FileSpreadsheet,
        buttonClass: "sub-btn-pilotagem-tabela",
      },
      {
        view: "pilotagem-links",
        label: "Links RED",
        icon: Link,
        buttonClass: "sub-btn-pilotagem-links",
      },
      {
        view: "pilotagem-sessoes",
        label: "Sessões de Pilotagem",
        icon: Users,
        buttonClass: "sub-btn-pilotagem-sessoes",
      },
      {
        view: "pilotagem-videos",
        label: "Vídeos introdutórios",
        icon: FilePlay,
        buttonClass: "sub-btn-pilotagem-videos",
      },
      {
        view: "pilotagem-questionarios",
        label: "Questionários",
        icon: FileCheck,
        buttonClass: "sub-btn-pilotagem-questionarios",
      },
      {
        view: "pilotagem-uminho",
        label: "Aprovações U.Minho",
        icon: Award,
        buttonClass: "sub-btn-pilotagem-uminho",
      },
    ],
  },
  {
    id: "gired",
    label: "Sobre o GiRED",
    triggerClass: "trigger-gired",
    items: [
      {
        view: "gired-oq",
        label: "O que é o GiRED?",
        icon: FileText,
        buttonClass: "sub-btn-gired-oq",
      },
      {
        view: "gired-ia",
        label: "Criar um RED com IA",
        icon: FileText,
        buttonClass: "sub-btn-gired-ia",
      },
      {
        view: "gired-construir",
        label: "Construir conteúdo",
        icon: FileText,
        buttonClass: "sub-btn-gired-construir",
      },
      {
        view: "gired-ideia",
        label: "Validação e testes",
        icon: FileText,
        buttonClass: "sub-btn-gired-ideia",
      },
    ],
  },
];
