'use client';
import React, { useEffect, useState } from 'react';

interface Document {
  id: string;
  tipo: string;
}

const Docs = () => {
  const [data, setData] = useState<Document[]>([]);

  // fetch data from API when component mounts
  useEffect(() => {
    fetch('/api/documentos')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>Documentos</h1>
      <ul>
        {data.map((doc) => (
          <li key={doc.id}>{doc.tipo} ({doc.id})</li>
        ))}
      </ul>
    </div>
  );
};

export default Docs;