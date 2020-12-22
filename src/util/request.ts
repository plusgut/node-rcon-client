const API_BASE = "/rcon";

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
export function request(
  endpoint: "send",
  parameter: {
    uid: string;
    command: string;
  }
): Promise<{
  connection: "connected";
  status: "success";
  response: { uid: string; body: string };
}>;
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
