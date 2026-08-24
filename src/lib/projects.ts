import { getCollection, type CollectionEntry } from "astro:content";

function compareByOrder(
  a: CollectionEntry<"projects">,
  b: CollectionEntry<"projects">,
) {
  if (a.data.order !== b.data.order) {
    return a.data.order - b.data.order;
  }
  // Deterministic tiebreaker if two entries accidentally share an order value.
  return a.id.localeCompare(b.id);
}

/** All projects, sorted by curated `order` (ascending), then by id. */
export async function getSortedProjects(): Promise<
  CollectionEntry<"projects">[]
> {
  const projects = await getCollection("projects");
  return projects.sort(compareByOrder);
}

/** Featured projects only, in curated order, capped at `limit`. */
export async function getFeaturedProjects(
  limit = 3,
): Promise<CollectionEntry<"projects">[]> {
  const sorted = await getSortedProjects();
  return sorted.filter((project) => project.data.featured).slice(0, limit);
}
