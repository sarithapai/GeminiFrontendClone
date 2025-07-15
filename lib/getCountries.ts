export async function getAllCountries() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=idd,name"
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((c: any) => ({
    label: `${c.name.common} (+${c.idd.root}${c.idd.suffixes?.[0] ?? ""})`,
    value: `${c.idd.root}${c.idd.suffixes?.[0] ?? ""}`,
  }));
}
