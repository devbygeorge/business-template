import Link from "next/link";
import { useState } from "react";

export default function Download({ documents }) {
  const [documentsState, setDocumentsState] = useState(documents);

  const handleGenerate = async () => {
    const response = await fetch("/api/documents", { method: "POST" });
    const data = await response.json();

    if (response.status === 200) setDocumentsState(data.documents);
    console.log(data.message);
  };

  return (
    <main className="main">
      <div className="container">
        <div className="documents">
          <button className="button" onClick={handleGenerate}>
            Generate Documents
          </button>
          <hr />

          {documentsState.map((document, index) => {
            return (
              <Link key={index} href={document.url}>
                <a download target="_blank">
                  <article className="document-canvas">
                    <span>{document.name}</span>
                  </article>
                </a>
              </Link>
            );
          })}

          <hr />
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const connectMongo = require("@/lib/connectMongo").default;
  const Document = require("@/models/documentModel").default;
  let documents = [];

  try {
    await connectMongo();

    const data = await Document.find();
    documents = JSON.parse(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }

  return {
    props: { documents },
  };
}
