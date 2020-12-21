const API_BASE = "https://codingbutter.com:2080/rcon/";

export function request(
  endpoint: "connect",
  parameter: {
    host: string;
    port: number;
    password: string;
  }
): Promise<{ status: "connected"; uid: string }>;
export function request(
  endpoint: "status",
  parameter: {
    uid: string;
  }
): Promise<{ status: "connected" } | { status: "not_connected" }>;
export async function request(
  endpoint: string,
  parameter: Record<string, unknown>
): Promise<any> {
  const result = await (
    await fetch(`${API_BASE}/${endpoint}`, {
      body: JSON.stringify(parameter),
      method: "POST",
    })
  ).json();

  if ("error" in result) {
    throw result;
  }
  return result;
}
