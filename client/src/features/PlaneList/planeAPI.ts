import { IPlaneProps } from "./PlaneCard/PlaneCard";

const plane = {
    id: 1,
    name: 'Airbus A380',
    description: "This is a very gigantic aeroplane. It's the biggest passenger plane on the planet.",
    photoUrl: "https://ocdn.eu/pulscms-transforms/1/lpJktkqTURBXy9jMjIyOGM2NzJkZTkwM2RmNDk0MDU2MWMzNjgzMTBhZS5qcGVnkpUDAADNAyDNAcKTBc0EsM0Cdg",
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    price: 30000000
}

export function getPlanes(): Promise<IPlaneProps[]> {
    return new Promise<IPlaneProps[]>((resolve) =>
      setTimeout(() => resolve([plane, plane, plane, plane]), 500)
    );
  }
  