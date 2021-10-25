const ALERTS_API = "https://visualsoft.com.pl/rekrutacja/202009/dane"

export async function getAlerts() {
    let response = await fetch(ALERTS_API);
    return response.json();
}