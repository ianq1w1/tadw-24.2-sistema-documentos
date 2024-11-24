'use client';
import React, { useEffect, useState } from 'react';

interface Documentos {
  id: number;
  titulo: string;

}



const Docs = () => {

  const [data, setData] = useState<Documentos[]>([]);

  // fetch data from API when component mounts
  useEffect(() => {
    fetch('/api/mulekote')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);
  return (
    <div>
      <h1>Documentos</h1>
      <ul>
        {data.map((docs) => (
          <li>{docs.titulo} ({docs.id})</li>
        ))}
      </ul>
    </div>
  );
};

export default Docs;