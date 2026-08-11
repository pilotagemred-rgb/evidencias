"use client";

import { useState } from "react";
import { useDriveFiles } from "@/hooks/useDriveFiles";
import {
  GALLERY_EXTENSIONS,
  GALLERY_PHOTO_COUNT,
} from "@/lib/staticData";
import { buildSafeUrl } from "@/lib/urls";
import { isImageMime } from "@/lib/drive/types";

function photoPath(index: number, ext: string) {
  return buildSafeUrl(`foto-pilotagem (${index})${ext}`);
}

function GalleryPhotoFallback({ index }: { index: number }) {
  const [extStep, setExtStep] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = photoPath(index, GALLERY_EXTENSIONS[extStep]);

  return (
    <div className="photo-card">
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img
          src={src}
          alt={`Sessão de Pilotagem ${index}`}
          onError={
            failed
              ? undefined
              : () => {
                  if (extStep + 1 < GALLERY_EXTENSIONS.length) {
                    setExtStep((current) => current + 1);
                    return;
                  }
                  setFailed(true);
                }
          }
        />
      </a>
    </div>
  );
}

export function SessoesGalleryPanel() {
  const { files, loading, error, configured } = useDriveFiles("gallery");
  const driveImages = files.filter((f) => isImageMime(f.mimeType));
  const driveReady = configured && !error;
  const usingDrive = driveReady && driveImages.length > 0;
  const driveEmpty = driveReady && driveImages.length === 0;

  return (
    <div className="content-view" id="panel-pilotagem-sessoes">
      <h2 className="content-heading-1">Sessões de Pilotagem</h2>
      <p className="content-text">
        Registos fotográficos das sessões de pilotagem realizadas em Julho de
        2026.
      </p>

      {loading && (
        <div className="table-loader">A carregar fotos do Google Drive...</div>
      )}

      {!loading && driveEmpty && (
        <div className="table-loader">
          Nenhuma imagem encontrada na pasta do Drive.
        </div>
      )}

      {!loading && usingDrive && (
        <div className="photo-gallery-grid">
          {driveImages.map((file) => (
            <div className="photo-card" key={file.id}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <img src={file.url} alt={file.name} />
              </a>
            </div>
          ))}
        </div>
      )}

      {!loading && !driveReady && (
        <div className="photo-gallery-grid">
          {Array.from({ length: GALLERY_PHOTO_COUNT }, (_, i) => i + 1).map(
            (index) => (
              <GalleryPhotoFallback key={index} index={index} />
            )
          )}
        </div>
      )}
    </div>
  );
}
