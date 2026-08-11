"use client";

import { useEffect, useState } from "react";
import type { DriveFile, DriveFolderKey } from "@/lib/drive/types";

type UseDriveFilesState = {
  files: DriveFile[];
  loading: boolean;
  error: string | null;
  configured: boolean;
};

export function useDriveFiles(folder: DriveFolderKey): UseDriveFilesState {
  const [state, setState] = useState<UseDriveFilesState>({
    files: [],
    loading: true,
    error: null,
    configured: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await fetch(`/api/drive/files?folder=${folder}`);
        const data = (await response.json()) as {
          files?: DriveFile[];
          configured?: boolean;
          error?: string;
        };

        if (cancelled) return;

        if (!response.ok) {
          setState({
            files: [],
            loading: false,
            configured: Boolean(data.configured),
            error: data.error ?? "Não foi possível carregar ficheiros do Drive.",
          });
          return;
        }

        setState({
          files: data.files ?? [],
          loading: false,
          configured: data.configured !== false,
          error: null,
        });
      } catch {
        if (cancelled) return;
        setState({
          files: [],
          loading: false,
          configured: false,
          error: "Erro de rede ao contactar a API do Drive.",
        });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [folder]);

  return state;
}
