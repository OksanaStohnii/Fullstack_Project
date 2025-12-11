async function getHealth() {
  try {
    const res = await fetch("http://localhost:3001/health", {
      // запрет кеша, чтобы всегда видеть актуальное
      cache: "no-store",
    });

    if (!res.ok) {
      return { error: `Request failed with status ${res.status}` };
    }

    return res.json();
  } catch (e: any) {
    return { error: e?.message || "Unknown error" };
  }
}

export default async function HomePage() {
  return <div>homePage</div>;
}
