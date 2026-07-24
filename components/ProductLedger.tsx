import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { getStatusLabel } from "@/content/projects";

type ProductLedgerProps = {
  projects: Project[];
  labelledBy: string;
};

export function ProductLedger({ projects, labelledBy }: ProductLedgerProps) {
  return (
    <ul className="product-ledger" aria-labelledby={labelledBy}>
      {projects.map((project, index) => (
        <li key={project.slug}>
          <Link className="product-ledger__row" href={project.route}>
            <span className="product-ledger__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="product-ledger__identity">
              <span className="product-ledger__name">{project.name}</span>
              <span className="product-ledger__category">
                {project.categoryLabel}
              </span>
            </span>
            <span className="product-ledger__description">
              {project.shortDescription}
            </span>
            <span className="product-ledger__status">
              {getStatusLabel(project.status)}
            </span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
