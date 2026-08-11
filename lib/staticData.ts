import { buildSafeUrl } from "./urls";

export type QuestionarioRow = {
  publico: string;
  inicialPdf: string;
  inicialXlsx: string;
  finalPdf: string;
  finalXlsx: string;
};

export type AnaliseRow = {
  documento: string;
  ficheiro: string;
};

export const QUESTIONARIOS: QuestionarioRow[] = [
  {
    publico: "Professores",
    inicialPdf: buildSafeUrl("questionario-inicial-professores.pdf"),
    inicialXlsx: buildSafeUrl(
      "Questionário inicial [Professores] (Responses).xlsx"
    ),
    finalPdf: buildSafeUrl("questionario-final-professores.pdf"),
    finalXlsx: buildSafeUrl(
      "Questionário final [Professores] (Responses).xlsx"
    ),
  },
  {
    publico: "Alunos 1.º Ciclo",
    inicialPdf: buildSafeUrl("questionario-inicial-1-ciclo.pdf"),
    inicialXlsx: buildSafeUrl(
      "Questionário inicial [1º Ciclo] (Responses).xlsx"
    ),
    finalPdf: buildSafeUrl("questionario-final-1-ciclo.pdf"),
    finalXlsx: buildSafeUrl(
      "Questionário final [1º Ciclo] (Responses).xlsx"
    ),
  },
  {
    publico: "Alunos 2.º e 3.º Ciclo",
    inicialPdf: buildSafeUrl("questionario-inicial-2-3-ciclo.pdf"),
    inicialXlsx: buildSafeUrl(
      "Questionário inicial [Alunos 2º e 3º Ciclos] (Responses).xlsx"
    ),
    finalPdf: buildSafeUrl("questionario-final-2-3-ciclo.pdf"),
    finalXlsx: buildSafeUrl(
      "Questionário final [Alunos 2º e 3º Ciclos] (Responses).xlsx"
    ),
  },
];

export const ANALISE_RESULTADOS: AnaliseRow[] = [
  {
    documento: "Análise de Resultados de Inquéritos - Professores",
    ficheiro: buildSafeUrl(
      "RED - E2.7 - Resultados Inqueritos_professores.pdf"
    ),
  },
  {
    documento: "Análise de Resultados de Inquéritos - 1.º Ciclo",
    ficheiro: buildSafeUrl(
      "RED - E2.7 - Resultados Inqueritos_1.ºCiclo.pdf"
    ),
  },
  {
    documento: "Análise de Resultados de Inquéritos - 2.º e 3.º Ciclos",
    ficheiro: buildSafeUrl(
      "RED - E2.7 - Resultados Inqueritos_2.º e 3.º Ciclo.pdf"
    ),
  },
];

export const UMINHO_EML_FILES = [
  "Parecer RED CN05 pré-pilotagem.eml",
  "Parecer RED CN06 pré-pilotagem.eml",
  "Parecer RED CN07 pré-pilotagem.eml",
  "Parecer RED CN08 pré-pilotagem.eml",
  "Parecer RED CN09 pré-pilotagem.eml",
  "Parecer RED EM01 pré-pilotagem.eml",
  "Parecer RED EM03 pré-pilotagem.eml",
  "Parecer RED FQ07 pré-pilotagem.eml",
  "Parecer RED FQ08 pré-pilotagem.eml",
  "Parecer RED FQ09 pré-pilotagem.eml",
  "Parecer RED MAT01 pré-pilotagem.eml",
  "Parecer RED MAT03 pré-pilotagem.eml",
  "Parecer RED MAT04 pré-pilotagem.eml",
  "Parecer RED MAT05 pré-pilotagem.eml",
  "Parecer RED MAT06 pré-pilotagem.eml",
  "Parecer RED MAT07 pré-pilotagem.eml",
  "Parecer RED MAT09 pré-pilotagem.eml",
  "Parecer RED PORT01 pré-pilotagem.eml",
  "Parecer RED PORT03 pré-pilotagem.eml",
  "Parecer RED PORT05 pré-pilotagem.eml",
  "Parecer RED PORT06 pré-pilotagem.eml",
  "Parecer RED PORT07 pré-pilotagem.eml",
  "Parecer RED PORT08 pré-pilotagem.eml",
  "Parecer RED PORT09 pré-pilotagem.eml",
  "Pareceres Pré-pilotagem.eml",
];

export const GALLERY_EXTENSIONS = [
  ".webp",
  ".jpeg",
  ".JPEG",
  ".jpg",
  ".JPG",
  ".png",
  ".PNG",
] as const;

export const GALLERY_PHOTO_COUNT = 31;

export const PROTOCOLO_PDF =
  process.env.NEXT_PUBLIC_PROTOCOLO_URL ||
  buildSafeUrl("red-protocolo-de-pilotagem-vfinal.pdf");

export const DRIVE_FOLDERS = {
  root: "https://drive.google.com/drive/folders/1mQlvyV_0rx0bA8NuOLPyTAeRsNcVb5ZS",
  uminho: "https://drive.google.com/drive/folders/1_bqGVe23id2DwpW2RCMfm0ToC6p6w6OU",
  gallery: "https://drive.google.com/drive/folders/1avp9wLNmSNJOF_qmrMF68g_856uauoaG",
  analise: "https://drive.google.com/drive/folders/1x4NapZOok8L6dFLxMA-C5XFrIEI29prZ",
  questionarios:
    "https://drive.google.com/drive/folders/10ICmM-0hrbdldtAYGz14FenFB6yaxN1u",
  protocolo:
    "https://drive.google.com/drive/folders/19SvDFVMhY2RMiFAJd375jbuLkg9rDMAv",
} as const;
