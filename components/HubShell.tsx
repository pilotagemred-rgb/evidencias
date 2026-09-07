"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HubNav } from "@/components/HubNav";
import { WelcomePanel } from "@/components/panels/WelcomePanel";
import { SobreOqPanel } from "@/components/panels/SobreOqPanel";
import { SobreSasPanel } from "@/components/panels/SobreSasPanel";
import { ProtocoloPanel } from "@/components/panels/ProtocoloPanel";
import { PilotagemTablePanel } from "@/components/panels/PilotagemTablePanel";
import { LinksRedPanel } from "@/components/panels/LinksRedPanel";
import { SessoesGalleryPanel } from "@/components/panels/SessoesGalleryPanel";
import { VideosPanel } from "@/components/panels/VideosPanel";
import { QuestionariosPanel } from "@/components/panels/QuestionariosPanel";
import { UminhoPanel } from "@/components/panels/UminhoPanel";
import { GiredPlaceholderPanel } from "@/components/panels/GiredPlaceholderPanel";
import { FrameHeightReporter } from "@/components/FrameHeightReporter";
import type { ViewId } from "@/lib/views";

export function HubShell() {
  const [view, setView] = useState<ViewId>("default");

  return (
    <div className="main" data-view={view}>
      <FrameHeightReporter resetKey={view} />
      <Header />

      <div className="page-header-container">
        <h1 className="page-title">RED - Documentação</h1>
        <p className="page-description">
          Esta página web recolhe os vários documentos e evidências referentes à
          documentação e Entregáveis produzidos no projeto CLPQ 01/2025/DGE -
          Aquisição de serviços para o desenvolvimento de Recursos Educativos
          Digitais para o Ensino Básico nas áreas de Português, Matemática e
          Ciências.
        </p>

        <div className="intro-illustration-box">
          <a
            href="https://i.imgur.com/harHv4o.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://i.imgur.com/harHv4o.png"
              alt="Ilustração RED"
            />
          </a>
        </div>
      </div>

      <div className="hub-wrapper">
        <div className="hub-container">
          <HubNav onNavigate={setView} />

          <div className="main-content-display">
            <WelcomePanel />
            <ProtocoloPanel />
            <PilotagemTablePanel />
            <LinksRedPanel />
            <SessoesGalleryPanel />
            <VideosPanel />
            <QuestionariosPanel />
            <UminhoPanel />
            {/* Sobre o EA */}
          <GiredPlaceholderPanel
            id="panel-ea-oq"
            title="O que é o EA?"
            description="Veja abaixo os vídeos explicativos sobre o Estudo Acompanhado:"
            folder="eavideo1"
          />
          <GiredPlaceholderPanel
            id="panel-ea-sas"
            title="SAs e Atividades"
            description="Vídeos demonstrativos das Situações de Aprendizagem e Atividades:"
            folder="eavideo2"
          />

          {/* Sobre o GiRED */}
          <GiredPlaceholderPanel
            id="panel-gired-oq"
            title="O que é o GiRED?"
            description="Visão geral sobre o sistema de Gestão Integrada de RED."
            folder="giredvideo1"
          />
          <GiredPlaceholderPanel
            id="panel-gired-ia"
            title="Criar um RED com IA"
            description="Como utilizar inteligência artificial para otimizar a criação de conteúdos."
            folder="giredvideo2"
          />
          <GiredPlaceholderPanel
            id="panel-gired-construir"
            title="Construir Conteúdo"
            description="Ferramentas e padrões de qualidade para o desenvolvimento das atividades."
            folder="giredvideo3"
          />
          <GiredPlaceholderPanel
            id="panel-gired-ideia"
            title="Validação e testes"
            description="Guia e processos de validação e testes de qualidade dos RED."
            folder="giredvideo4"
          />
          </div>
        </div>
      </div>

      <div className="illustrations-section">
        <div className="illustration-container">
          <a
            href="https://i.imgur.com/harHv4o.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://i.imgur.com/harHv4o.png"
              alt="Descrição da imagem"
            />
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
