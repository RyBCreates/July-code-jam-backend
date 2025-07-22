import sys
import json
import numpy as np
from math import radians, sin, cos, sqrt, atan2
from sklearn.neighbors import NearestNeighbors

def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

def optimize_route(locations):
    try:
        # Convert to numeric coordinates
        coords = [
            (float(loc["latitude"]), float(loc["longitude"]))
            for loc in locations
        ]
    except (KeyError, ValueError) as e:
        return {"error": f"Invalid coordinates: {str(e)}"}

    loc_rad = np.radians(coords)

    nbrs = NearestNeighbors(n_neighbors=len(coords), metric='haversine')
    nbrs.fit(loc_rad)

    visited = [0]
    total_distance = 0
    current = 0

    while len(visited) < len(coords):
        distances, indices = nbrs.kneighbors([loc_rad[current]])
        for ind, dist in zip(indices[0], distances[0]):
            if ind not in visited:
                visited.append(ind)
                total_distance += dist * 6371  # Convert from radians to km
                current = ind
                break

    optimized = [locations[i] for i in visited]
    return {"optimizedRoute": optimized, "totalDistanceKm": round(total_distance, 2)}

def main():
    try:
        input_data = sys.stdin.read()
        parsed = json.loads(input_data)
        locations = parsed["locations"]
        result = optimize_route(locations)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
