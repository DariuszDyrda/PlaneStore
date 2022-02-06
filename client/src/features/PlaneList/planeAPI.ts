import { IPlaneProps } from "./PlaneCard/PlaneCard";

export interface PlaneAPIResponse {
  results: IPlaneProps[];
  status: {
    offset: number;
    total: number;
  }
}

const plane: IPlaneProps = {
    id: 1,
    name: 'Airbus A380',
    description: "This is a very gigantic aeroplane. It's the biggest passenger plane on the planet.",
    photoUrl: "https://ocdn.eu/pulscms-transforms/1/lpJktkqTURBXy9jMjIyOGM2NzJkZTkwM2RmNDk0MDU2MWMzNjgzMTBhZS5qcGVnkpUDAADNAyDNAcKTBc0EsM0Cdg",
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    price: 30000000
}

const results = [];
for (let i = 0; i < 34; ++i) results.push({ ...plane, id: i+1});

const mockApiResponse = {
  results: results.slice(0, 9),
  status: {
    offset: 0,
    total: results.length,
  }
}

export function getPlanes() {
    return new Promise<PlaneAPIResponse>((resolve) =>
      setTimeout(() => resolve(mockApiResponse), 1000)
    );
  }
  