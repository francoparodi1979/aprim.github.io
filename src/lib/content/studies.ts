import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

const STUDIES_DIR = path.join(process.cwd(), "src/content/studies");

/**
 * Frontmatter contract for /src/content/studies/*.mdx. Anything outside the
 * schema is rejected at load time so a typo doesn't quietly ship.
 */
const studyFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  condition: z.enum(["copd", "asthma", "ipf", "bronchiectasis", "other"]),
  status: z.enum([
    "recruiting",
    "upcoming",
    "enrolling_by_invitation",
    "active",
    "paused",
    "completed",
    "terminated",
  ]),
  phase: z.string().optional(),
  nctId: z.string().optional(),
  sponsor: z.string().optional(),
  shortSummary: z.string().min(1),
  ageRange: z.tuple([z.number().int(), z.number().int()]).optional(),
  visitCount: z.number().int().positive().optional(),
  durationWeeks: z.number().int().positive().optional(),
  compensation: z.string().optional(),
  location: z.string().optional(),
  publishedAt: z.string().optional(),
  featured: z.boolean().default(false),
});

export type StudyFrontmatter = z.infer<typeof studyFrontmatterSchema>;

/** Visitor-facing label for each study-page status. */
export const STUDY_STATUS_LABEL: Record<StudyFrontmatter["status"], string> = {
  recruiting: "Recruiting",
  upcoming: "Not yet recruiting",
  enrolling_by_invitation: "By invitation",
  active: "Active · not recruiting",
  paused: "Paused by sponsor",
  completed: "Completed",
  terminated: "Terminated",
};

export interface Study extends StudyFrontmatter {
  body: string;
}

let cache: Study[] | null = null;

export async function getAllStudies(): Promise<Study[]> {
  if (cache && process.env.NODE_ENV === "production") return cache;

  let files: string[];
  try {
    files = await fs.readdir(STUDIES_DIR);
  } catch {
    return [];
  }

  const studies = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(STUDIES_DIR, file), "utf8");
        const { data, content } = matter(raw);
        const parsed = studyFrontmatterSchema.safeParse(data);
        if (!parsed.success) {
          throw new Error(
            `Invalid frontmatter in ${file}: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`
          );
        }
        return { ...parsed.data, body: content };
      })
  );

  // Sort: recruiting first, then alpha by title.
  studies.sort((a, b) => {
    const order = {
      recruiting: 0,
      upcoming: 1,
      enrolling_by_invitation: 2,
      active: 3,
      paused: 4,
      completed: 5,
      terminated: 6,
    };
    return order[a.status] - order[b.status] || a.title.localeCompare(b.title);
  });

  cache = studies;
  return studies;
}

export async function getStudyBySlug(slug: string): Promise<Study | null> {
  const all = await getAllStudies();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getStudiesByCondition(
  condition: StudyFrontmatter["condition"]
): Promise<Study[]> {
  const all = await getAllStudies();
  return all.filter((s) => s.condition === condition);
}

export async function getRecruitingStudies(): Promise<Study[]> {
  const all = await getAllStudies();
  return all.filter((s) => s.status === "recruiting");
}
