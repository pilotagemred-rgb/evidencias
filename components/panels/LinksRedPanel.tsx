"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import {
  LINKS_RED_CSV_URL,
  normalizeLinksRedRows,
  uniqueFilterValues,
  type CsvRow,
} from "@/lib/sheets";
import { buildSafeUrl, isLinkCell } from "@/lib/urls";

type Filters = {
  red: string;
  disciplina: string;
  ano: string;
};

const emptyFilters: Filters = { red: "", disciplina: "", ano: "" };

export function LinksRedPanel() {
  const [rawData, setRawData] = useState<CsvRow[]>([]);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    Papa.parse<CsvRow>(LINKS_RED_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          setStatus("ready");
          return;
        }
        setRawData(normalizeLinksRedRows(results.data));
        setStatus("ready");
      },
      error: () => setStatus("error"),
    });
  }, []);

  const options = useMemo(
    () => ({
      red: uniqueFilterValues(
        rawData,
        (k) =>
          k.includes("red") || k.includes("recurso") || k.includes("nome")
      ),
      disciplina: uniqueFilterValues(rawData, (k) =>
        k.includes("disciplina")
      ),
      ano: uniqueFilterValues(rawData, (k) => k.includes("ano")),
    }),
    [rawData]
  );

  const filtered = useMemo(() => {
    const valRed = filters.red.toLowerCase();
    const valDisc = filters.disciplina.toLowerCase();
    const valAno = filters.ano.toLowerCase();

    return rawData.filter((row) => {
      let matchesRed = !valRed;
      let matchesDisc = !valDisc;
      let matchesAno = !valAno;

      Object.keys(row).forEach((key) => {
        const trimmedKey = key.trim().toLowerCase();
        const value = (row[key] || "").trim().toLowerCase();

        if (
          (trimmedKey.includes("red") ||
            trimmedKey.includes("recurso") ||
            trimmedKey.includes("nome")) &&
          valRed &&
          value === valRed
        ) {
          matchesRed = true;
        }
        if (
          trimmedKey.includes("disciplina") &&
          valDisc &&
          value === valDisc
        ) {
          matchesDisc = true;
        }
        if (trimmedKey.includes("ano") && valAno && value === valAno) {
          matchesAno = true;
        }
      });

      return matchesRed && matchesDisc && matchesAno;
    });
  }, [rawData, filters]);

  const updateFilter = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const headers = filtered.length > 0 ? Object.keys(filtered[0]) : [];

  return (
    <div className="content-view" id="panel-pilotagem-links">
      <h2 className="content-heading-1">Links RED</h2>
      <p className="content-text">
        Consulte e filtre a lista de Recursos Educativos Digitais abaixo.
      </p>

      <div className="table-filters-wrapper">
        <div className="filter-group">
          <label htmlFor="filter-links-red">Filtro por RED</label>
          <select
            id="filter-links-red"
            className="filter-select"
            value={filters.red}
            onChange={(e) => updateFilter("red", e.target.value)}
          >
            <option value="">Todos os REDs</option>
            {options.red.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-links-disciplina">Disciplina</label>
          <select
            id="filter-links-disciplina"
            className="filter-select"
            value={filters.disciplina}
            onChange={(e) => updateFilter("disciplina", e.target.value)}
          >
            <option value="">Todas as Disciplinas</option>
            {options.disciplina.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-links-ano">Ano de Escolaridade</label>
          <select
            id="filter-links-ano"
            className="filter-select"
            value={filters.ano}
            onChange={(e) => updateFilter("ano", e.target.value)}
          >
            <option value="">Todos os Anos</option>
            {options.ano.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive-container">
        {status === "loading" && (
          <div className="table-loader">
            A carregar dados dos Recursos Educativos Digitais...
          </div>
        )}
        {status === "error" && (
          <div className="table-loader">
            Erro ao carregar dados dos Links RED.
          </div>
        )}
        {status === "ready" && filtered.length === 0 && (
          <div className="table-loader">Nenhum resultado encontrado.</div>
        )}
        {status === "ready" && filtered.length > 0 && (
          <table className="dynamic-table">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header) => {
                    const val = (row[header] || "-").trim();
                    if (val !== "-" && isLinkCell(val)) {
                      return (
                        <td key={header}>
                          <a
                            href={buildSafeUrl(val)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-aceder-sm"
                          >
                            <i className="fa-solid fa-arrow-up-right-from-square" />{" "}
                            Aceder
                          </a>
                        </td>
                      );
                    }
                    return <td key={header}>{val}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
