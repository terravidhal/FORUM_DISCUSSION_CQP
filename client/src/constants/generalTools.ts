export function formatDate2(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("fr-FR", options);
}

export function countActions(sessions: any) {
  let download = 0;
  let send = 0;

  for (const session of sessions) {
    if (session.action === "CREATE_CERTIFICATE") {
      download += 1;
    } else if (session.action === "SEND_EMAIL") {
      send += 1;
    }
  }
  return { download, send };
}
