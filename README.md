# Geospatial Analytics for Adventure Tourism in Colorado
## Introduction
This project leverages data science and geospatial analytics to identify, analyze, and optimize recreational travel routes across Colorado. The aim is to support strategic planning in adventure-based tourism by evaluating ideal destinations for various outdoor activities such as hiking, biking, and kayaking.

## Project Objectives
- Identify recreational hotspots based on activity type, elevation, and accessibility.
- Visualize and compare predefined (base) and optimized travel routes.
- Reduce total distance traveled using geospatial algorithms.

---

## Methodology

### Data Collection
We selected 8 major recreational locations in Colorado, recording:
- Trail and Location Name
- Latitude and Longitude
- Elevation
- Activity Type (e.g., hiking, fishing, biking)
- Accessibility metrics (e.g., entrance passes, camping availability)

Example data point:

| Location         | Trail Name                       | Activity Type      | Elevation (ft) | Latitude  | Longitude   |
|------------------|----------------------------------|--------------------|----------------|-----------|-------------|
| Maroon Bells     | Maroon Lake Scenic Loop Trail    | Hiking             | 160 ft gain    | 39.09991  | -106.94192  |

---

## Visualizations

### 1. Sunburst Chart
Displays key cities grouped by **North** and **South** Colorado. It shows spatial clustering of adventure spots for strategic planning.

### 2. Elevation Profile
A line chart that shows how elevation increases across the route from Grand Junction to Aspen.

### 3. Route Comparison Bar Chart
Bar plot comparing multiple hiking route options based on total distance.

---

## Base Route Model

We used the **Haversine formula** to calculate great-circle distances between each pair of destinations in a fixed loop:

```python
from math import radians, sin, cos, sqrt, atan2

def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of the Earth in km
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    return R * c
```

### Base Route Distance Summary:

| Segment                                       | Distance (km) |
|----------------------------------------------|---------------|
| Bear Lake → Maroon Lake                      | 174.5         |
| Maroon → Chautauqua                          | 173.9         |
| Chautauqua → Buffalo Canyon                  | 137.2         |
| Buffalo → Spud Lake                          | 298.1         |
| Spud → Grizzly Creek                         | 227.9         |
| Grizzly → Riverfront                         | 113.0         |
| Riverfront → Riverbend Ponds                 | 343.6         |
| Riverbend → Bear Lake                        | 59.5          |
| **Total**                                    | **1527.7**    |

---

## Optimized Route Model

### Algorithm
We used a **Greedy Nearest-Neighbor** algorithm with Scikit-learn's `NearestNeighbors`:

```python
from sklearn.neighbors import NearestNeighbors

features = ['latitude', 'longitude']
nbrs = NearestNeighbors(n_neighbors=5, metric='haversine')
nbrs.fit(df[features].apply(radians).values)
```

### Optimized Sequence:
`[0, 2, 7, 5, 1, 3, 6, 4, 0]`

### Total Distance: **1287.3 km**

---

## Comparison

| Model Type | Total Distance (km) | Efficiency Gain     |
|------------|----------------------|----------------------|
| Base Route | 1527.7               | -                    |
| Optimized  | 1287.3               | ~16% distance saved  |

Optimized routing significantly reduced total distance by eliminating unnecessary detours and improving travel efficiency.

---

## Key Route Options (for 3-trail plans)

| Route | Distance (km) | Trail Path                                                      |
|-------|----------------|------------------------------------------------------------------|
| A     | 348.4          | Bear Lake → Maroon Lake → Chautauqua                           |
| B     | 311.1          | Maroon → Chautauqua → Buffalo Canyon                           |
| C     | 435.3          | Chautauqua → Buffalo Canyon → Spud Lake                        |
| G     | 518.1          | Riverfront → Riverbend → Bear Lake                             |

---

## Conclusion

This project demonstrates the power of combining geospatial analytics and algorithmic modeling to improve route efficiency for outdoor recreation planning. By comparing fixed and optimized routes, we offer insights into terrain elevation, activity clusters, and travel efficiency.

---

## Recommendations for Future Research

- **Incorporate Real-Time Data**: such as weather and trail conditions.
- **Expand Activity Types**: to include seasonal sports like snowshoeing and kayaking.
- **Use Advanced Algorithms**: such as A*, genetic algorithms, or ant colony optimization.
- **Include Environmental Impact Metrics**: to support sustainable tourism.
- **User-Centric Route Customization**: based on preferences and accessibility needs.
- **Analyze Economic Impacts**: of tourism optimization on local communities.
- **Mobile App Integration**: for real-time hiking route planning.

---

## Tools & Libraries Used

- Python
- Pandas
- NumPy
- Matplotlib
- Plotly
- Folium
- Scikit-learn
- Haversine Formula

## Authors
Sohini Tomar
Rawaa Yousseif 
