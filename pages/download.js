import Link from 'next/link'
import fs from 'fs'
import { useState } from 'react'

import styles from '../components/Form/Form.module.css'

export default function Download({ data }) {

  const [documents, setDocuments] = useState(data)

  const generateHandler = async () => {
    const response = await fetch('/api/documents', { method: 'POST' });
    const data = await response.json()
    setDocuments(data)
  }
  
  return (
    <>
    <main className="container documents">
      <button className={styles.button} onClick={generateHandler} >Generate Documents</button>
      <hr />

      {
        documents.map((document, index) => {
          return (
            <Link key={index} href={`/generation/documents/${document}`}>
              <a download target='_blank'>
                <article className="document-canvas">
                  <span>{document}</span>
                  <span><i className='bx bxs-cloud-download'></i></span>
                </article>
              </a>
            </Link>
          )
        })
      }

      <hr />
    </main>
    </>
  )
}

  export async function getServerSideProps() {

    const data = fs.readdirSync('./public/generation/documents');

    return {
      props: {
        data,
      }
    }
  }