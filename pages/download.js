import Link from "next/link";
import fs from "fs";
import path from "path";
import { useState } from "react";

import styles from "@/styles/Form.module.css";

export default function Download({ data }) {
  const [documents, setDocuments] = useState(data);

  const generateHandler = async () => {
    const response = await fetch("/api/documents", { method: "POST" });
    const data = await response.json();
    setDocuments(data);
  };

  return (
    <main className="main">
      <div className="container">
        <div className="documents">
          <button className={styles.button} onClick={generateHandler}>
            Generate Documents
          </button>
          <hr />

          {documents.map((document, index) => {
            return (
              <Link key={index} href={`/generation/documents/${document}`}>
                <a download target="_blank">
                  <article className="document-canvas">
                    <span>{document}</span>
                    <span>
                      <i className="bx bxs-cloud-download"></i>
                    </span>
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
  const documentsPath = path.resolve(
    process.cwd(),
    "public/generation/documents"
  );

  const data = fs.readdirSync(documentsPath);

  return {
    props: {
      data,
    },
  };
}
