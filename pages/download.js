import Link from "next/link";
import { useState } from "react";

export default function Download({ documents }) {
  const [documentsState, setDocumentsState] = useState(documents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    const response = await fetch("/api/documents", { method: "POST" });

    setLoading(false);

    if (response.status === 200) {
      const data = await response.json();
      console.log(data.message);

      setDocumentsState(data.documents);
    } else {
      setError(true);
    }
  };

  if (loading) {
    return <div className="preloader"></div>;
  }

  if (error) {
    return (
      <div className="container">
        Something happened. Please try again later!
      </div>
    );
  }

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
  const Documents = require("@/models/documentsModel").default;
  let documents = [];

  try {
    await connectMongo();

    const data = await Documents.find();
    if (data.length) {
      documents = JSON.parse(JSON.stringify(data[0].data));
    }
  } catch (e) {
    console.error(e);
  }

  return {
    props: { documents },
  };
}
