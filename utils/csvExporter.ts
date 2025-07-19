
const convertToCSV = <T extends object,>(data: T[]): string => {
  if (data.length === 0) {
    return "";
  }
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => 
    headers.map(header => {
      let value = (obj as any)[header];
      if (Array.isArray(value)) {
        value = value.join('; '); // Join array elements
      }
      const strValue = String(value ?? '').replace(/"/g, '""'); // Escape double quotes
      return `"${strValue}"`;
    }).join(',')
  );
  return [headers.join(','), ...rows].join('\n');
};

export const exportToCSV = <T extends object,>(data: T[], filename: string): void => {
    if (data.length === 0) {
        alert("No data to export.");
        return;
    }
  const csvString = convertToCSV(data);
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
