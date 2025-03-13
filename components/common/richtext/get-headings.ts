export interface HeadingNode {
  tag: string;
  type: string;
  format: string;
  indent: number;
  version: number;
  children: any[];
  direction: string;
}

export interface ProcessedHeading {
  text: string;
  level: number;
  tag: string;
  anchor: string;
}
export function slugify(string: string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/-{2,}/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
export function getHeadings(
  nodes: HeadingNode[],
  level = 1
): ProcessedHeading[] {
  const headings: ProcessedHeading[] = [];

  for (const node of nodes) {
    if (node.type === "heading") {
      // Extract text from children
      const text = node.children?.[0]?.text || "";
      // Get heading level from tag (h1 = 1, h2 = 2, etc.)
      const headingLevel = parseInt(node.tag.substring(1));

      headings.push({
        text,
        anchor: text.split(" ").join("-"),
        level: headingLevel,
        tag: node.tag,
      });
    }

    // Recursively process children if they exist
    if (node.children && Array.isArray(node.children)) {
      headings.push(...getHeadings(node.children, level + 1));
    }
  }

  return headings;
}
