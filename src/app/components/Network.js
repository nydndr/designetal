import path from "path";
import fs, { link } from "fs";
import matter from "gray-matter";

function getAllFields() {
  const fieldsDirectory = path.join(process.cwd(), "data", "fields");
  const allFieldsFileNames = fs.readdirSync(fieldsDirectory);

  const allFieldsIndexed = [];

  allFieldsFileNames.forEach((fieldFileName, fieldIndex) => {
    const fieldContent = fs.readFileSync(
      path.join(fieldsDirectory, fieldFileName),
      "utf8"
    );
    const fieldMetadata = matter(fieldContent).data;
    const fieldTitle = fieldMetadata.title;
    const fieldSubFieldsTitles = fieldMetadata.sub_fields;

    allFieldsIndexed.push({
      fieldFileName: fieldFileName,
      fieldIndex: fieldIndex,
      fieldMetadata: fieldMetadata,
      fieldTitle: fieldTitle,
      fieldSubFieldsTitles: fieldSubFieldsTitles,
    });
  });

  const nodesJSON = [];
  const linksJSON = [];
  allFieldsIndexed.forEach((field) => {
    nodesJSON.push({ id: field.fieldIndex, name: field.fieldTitle });

    const hasSubFields = field.fieldSubFieldsTitles === null ? false : true;

    if (field.fieldSubFieldsTitles !== null)
      field.fieldSubFieldsTitles
        .replace(/\s/g, "")
        .split(",")
        .forEach((title) => {
          allFieldsIndexed.forEach((indexedField) => {
            if (indexedField.fieldFileName.replace(/.mdx/g, "") === title)
              linksJSON.push({
                source: field.fieldIndex,
                target: indexedField.fieldIndex,
              });
          });
        });
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
