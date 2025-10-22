import path from "path";
import fs, { link } from "fs";
import matter from "gray-matter";

function getAllFields() {
  const fieldsDirectory = path.join(process.cwd(), "data", "fields");
  const allFields = fs.readdirSync(fieldsDirectory);

  const nodesJSON = [];
  const linksJSON = [];

  allFields.map((fileName, index) => {
    const fieldPath = path.join(fieldsDirectory, fileName);
    const fileContents = fs.readFileSync(fieldPath, "utf8");

    nodesJSON.push({ id: index, name: fileName.replace(/\.md$/, "") });

    const data = matter(fileContents).data;

    if (data.sub_fields !== null) {
      data.sub_fields
        .replace(/\s/g, "")
        .split(",")
        .forEach((subField) => {
          linksJSON.push({ source: index, target: subField + ".mdx" });
        });
    } else {
      return;
    }
  });

  return { nodes: nodesJSON, links: linksJSON };
}

export default function Network() {
  const fields = getAllFields();

  console.log(fields);
  return (
    <ul>
      <h1>AAAAA</h1>
      {/* {fields.map((field) => (
        <li key={field}>{field}</li>
      ))} */}
    </ul>
  );
}
