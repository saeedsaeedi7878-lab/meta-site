import type { Article } from "@/config/articles";
import { articleHeadings } from "@/lib/articles";

function blockId(article: Article, index: number) {
  const headingIndexes = article.blocks.flatMap((block, blockIndex) => (block.type === "heading" ? [blockIndex] : []));
  const place = headingIndexes.indexOf(index);
  return articleHeadings(article)[place]?.id;
}

export function ArticleBody({ article }: { article: Article }) {
  return (
    <div className="prose">
      {article.blocks.map((block, index) => {
        if (block.type === "paragraph") return <p key={index}>{block.text}</p>;
        if (block.type === "note") {
          return (
            <aside key={index} className="prose-note">
              {block.text}
            </aside>
          );
        }
        if (block.type === "heading") {
          return (
            <h2 key={index} id={blockId(article, index)}>
              {block.text}
            </h2>
          );
        }
        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag key={index}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ListTag>
          );
        }
        return (
          <figure key={index} className="prose-table">
            <table>
              <caption>{block.caption}</caption>
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th key={header} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join("-")}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </figure>
        );
      })}
    </div>
  );
}