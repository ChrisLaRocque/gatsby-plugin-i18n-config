import React from "react";

export default function Index({ pageContext }) {
  const { locale } = pageContext;
  return (
    <main>
      <h1>{`Homepage in ${locale}!`}</h1>
    </main>
  );
}
