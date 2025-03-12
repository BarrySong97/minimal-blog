export interface HeadingNode {
  tag: string;
  type: string;
  format: string;
  indent: number;
  version: number;
  children: any[];
  direction: string;
}

interface ProcessedHeading {
  text: string;
  level: number;
  tag: string;
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
