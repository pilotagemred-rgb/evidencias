"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { NAV_GROUPS, type ViewId } from "@/lib/views";

type HubNavProps = {
  onNavigate: (view: ViewId) => void;
};

export function HubNav({ onNavigate }: HubNavProps) {
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpenGroupId(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="horizontal-menu" ref={menuRef}>
      {NAV_GROUPS.map((group) => {
        const isOpen = openGroupId === group.id;

        return (
          <div
            key={group.id}
            className={`dropdown-group${isOpen ? " is-open" : ""}`}
          >
            <button
              type="button"
              className={`nav-button ${group.triggerClass}`}
              aria-expanded={isOpen}
              aria-haspopup="true"
              onClick={() =>
                setOpenGroupId((current) =>
                  current === group.id ? null : group.id
                )
              }
            >
              <span className="nav-text">{group.label}</span>
              <ChevronDown className="icon-chevron" />
            </button>
            <div className="sub-panel">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.view}
                    type="button"
                    className={`sub-nav-item ${item.buttonClass}`}
                    onClick={() => {
                      onNavigate(item.view);
                      setOpenGroupId(null);
                    }}
                  >
                    <Icon className="icon-sub" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
