"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import {
  PILOTAGEM_CSV_URL,
  uniqueFilterValues,
  type CsvRow,
} from "@/lib/sheets";
import { buildSafeUrl, isLinkCell } from "@/lib/urls";

type Filters = {
  data: string;
  ae: string;
  ano: string;
  realizou: string;
};

const emptyFilters: Filters = { data: "", ae: "", ano: "", realizou: "" };

export function PilotagemTablePanel() {
  const [rawData, setRawData] = useState<CsvRow[]>([]);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    Papa.parse<CsvRow>(PILOTAGEM_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setRawData(results.data);
        setStatus("ready");
      },
      error: () => setStatus("error"),
    });
  }, []);

  const options = useMemo(
    () => ({
      data: uniqueFilterValues(rawData, (k) => k.includes("data")),
      ae: uniqueFilterValues(
        rawData,
        (k) => k === "ae" || k.includes("agrupamento")
      ),
      ano: uniqueFilterValues(rawData, (k) => k.includes("ano")),
      realizou: uniqueFilterValues(rawData, (k) => k.includes("realizou")),
    }),
    [rawData]
  );

  const filtered = useMemo(() => {
    const valData = filters.data.toLowerCase();
    const valAE = filters.ae.toLowerCase();
    const valAno = filters.ano.toLowerCase();
    const valRealizou = filters.realizou.toLowerCase();

    return rawData.filter((row) => {
      let matchesData = !valData;
      let matchesAE = !valAE;
      let matchesAno = !valAno;
      let matchesRealizou = !valRealizou;

      Object.keys(row).forEach((key) => {
        const trimmedKey = key.trim().toLowerCase();
        const value = (row[key] || "").trim().toLowerCase();

        if (trimmedKey.includes("data") && valData && value === valData) {
          matchesData = true;
        }
        if (
          (trimmedKey === "ae" || trimmedKey.includes("agrupamento")) &&
          valAE &&
          value === valAE
        ) {
          matchesAE = true;
        }
        if (trimmedKey.includes("ano") && valAno && value === valAno) {
          matchesAno = true;
        }
        if (
          trimmedKey.includes("realizou") &&
          valRealizou &&
          value === valRealizou
        ) {
          matchesRealizou = true;
        }
      });

      return matchesData && matchesAE && matchesAno && matchesRealizou;
    });
  }, [rawData, filters]);

  const updateFilter = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const headers = filtered.length > 0 ? Object.keys(filtered[0]) : [];

  return (
    <div className="content-view" id="panel-pilotagem-tabela">
      <h2 className="content-heading-1">Tabela da Pilotagem</h2>
      <p className="content-text">
        Consulte a tabela com informação sobre as sessões de pilotagem já
        realizadas.
      </p>

      <div className="table-filters-wrapper">
        <div className="filter-group">
          <label htmlFor="filter-data">Data</label>
          <select
            id="filter-data"
            className="filter-select"
            value={filters.data}
            onChange={(e) => updateFilter("data", e.target.value)}
          >
            <option value="">Todas</option>
            {options.data.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-ae">AE</label>
          <select
            id="filter-ae"
            className="filter-select"
            value={filters.ae}
            onChange={(e) => updateFilter("ae", e.target.value)}
          >
            <option value="">Todos</option>
            {options.ae.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-ano">Ano de Escolaridade</label>
          <select
            id="filter-ano"
            className="filter-select"
            value={filters.ano}
            onChange={(e) => updateFilter("ano", e.target.value)}
          >
            <option value="">Todos</option>
            {options.ano.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-realizou">Realizou-se</label>
          <select
            id="filter-realizou"
            className="filter-select"
            value={filters.realizou}
            onChange={(e) => updateFilter("realizou", e.target.value)}
          >
            <option value="">Todos</option>
            {options.realizou.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive-container">
        {status === "loading" && (
          <div className="table-loader">A carregar dados da pilotagem...</div>
        )}
        {status === "error" && (
          <div className="table-loader">Erro ao carregar dados do CSV.</div>
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
