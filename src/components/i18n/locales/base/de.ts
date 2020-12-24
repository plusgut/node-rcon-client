import type base from "./en";

const result: typeof base = {
  login: {
    host: "Host",
    port: "Port",
    password: "Passwort",
    connect: "Verbinden",
    error: "Es war nicht möglich zu verbinden",
  },
  dashboard: {
    weather: {
      type: {
        rain: "Regen",
        clear: "Klar",
        thunder: "Donner",
      },
      error: "Es war nicht möglich das Wetter zu setzen",
    },
  },
};

export default result;
