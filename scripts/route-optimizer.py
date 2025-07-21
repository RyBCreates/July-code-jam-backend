# %%
import pandas as pd
import networkx as nx
import seaborn as sns
import matplotlib.pyplot as plt
from scipy.spatial import distance
import numpy as np
import json 
import plotly.express as px
from sklearn.neighbors import NearestNeighbors
import folium
from folium import plugins

# %%
data = pd.read_json("Sohini July code jam.json")
data

# %%
data.columns

# %% [markdown]
# ## Calculations of the distance between two locations

# %%
from math import radians, sin, cos, sqrt, atan2 

def haversine(lat1, lon1, lat2, lon2):
    R= 6371 # Earth radius
        # convert degree in radians
    lat1, lon1, lat2, lon2 = map(radians,[lat1, lon1, lat2, lon2])

    dlat= lat2- lat1
    dlon= lon2 - lon1

        #haversine formula
    a= sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2* atan2(sqrt(a), sqrt(1-a))
    distance= R * c

    return distance

# %% [markdown]
# ## Base route model calculation 

# %%

dist_km1 =  haversine(40.31196, -105.64581, 39.09991, -106.94192)
print ("Distance between Bear Lake Loop to Maroon Lake Scenic Loop Trail:", dist_km1)

dist_km2= haversine(39.09991, -106.94192, 40.0008, -105.2836 )
print ("Distance between Maroon Lake Scenic Loop Trail to Chautauqua Trail:",dist_km2) 

dist_km3 = haversine(40.0008, -105.2836, 38.8110,-104.8599)
print ("Distance between Chautauqua Trail to Buffalo Canyon Trail:", dist_km3) 

dist_km4 = haversine(38.8110,-104.8599, 37.4286,-107.7794)
print ("Distance between Buffalo Canyon Trail to Spud Lake Trail:", dist_km4) 

dist_km5 = haversine(37.4286,-107.7794, 39.4475, -107.33 )
print ("Distance between Spud Lake Trail to Grizzly Creek Trail:", dist_km5)

dist_km6 = haversine(39.4475, -107.33, 39.0742, -108.5506 )
print ("Distance between Grizzly Creek Trail to Riverfront Trail:", dist_km6) 

dist_km7 = haversine(39.0742, -108.5506, 40.5456, -105.0129 )
print ("Distance between Riverfront Trail to Riverbend Ponds Natural Area :", dist_km7) 

base_total_distance = dist_km1 + dist_km2 + dist_km3 + dist_km4 + dist_km5 + dist_km6 + dist_km7 
base_total_distance

print("Total distance for base route:",base_total_distance)


# %% [markdown]
# ## Different hiking route a user take to plan his trip

# %%

sample_dist_1 = dist_km1 + dist_km2 + dist_km3
print( "sample 1:",sample_dist_1) 

sample_dist_2 = dist_km1 + dist_km2 + dist_km4
print( "sample 2:", sample_dist_2)

sample_dist_3 = dist_km1 + dist_km2 + dist_km5
print( "sample 3:", sample_dist_3)

sample_dist_4 =dist_km1 + dist_km2 + dist_km6
print( "sample 4:", sample_dist_4)

sample_dist_5 =dist_km1 + dist_km2 + dist_km7
print( "sample 5:", sample_dist_5)

sample_dist_6 =dist_km2 + dist_km3 + dist_km4
print( "sample 6:", sample_dist_6)

sample_dist_7 =dist_km2 + dist_km3 + dist_km5
print( "sample 7:", sample_dist_7)

sample_dist_8 =dist_km2 + dist_km3 + dist_km6
print( "sample 8:", sample_dist_8)

sample_dist_9 =dist_km2 + dist_km3 + dist_km7
print( "sample 9:", sample_dist_9)

# %%
features = ['latitude', 'longitude']

# %% [markdown]
# ## Function with help of nearest neighbors

# %%
def get_knn(df, n, k, metric):
    
    """
    Returns k nearest neighbors

    :param df: pandas DataFrame used to find similar objects within
    :param n: object no for which the nearest neighbours are looked for
    :param k: the number of the nearest neighbours to return
    :param metric: name of distance metric
    """

    nbrs = NearestNeighbors(n_neighbors = 5, metric= metric)
    nbrs.fit(df[features].values)
    nbrs_distances, nbrs_indices = nbrs.kneighbors(data.iloc[n][features].values.reshape(1,-1), k, return_distance=True)
    
    df_res = pd.concat([
        df.iloc[nbrs_indices[0]], 
        pd.DataFrame(nbrs_distances.T, index=nbrs_indices[0], columns=['distance'])
        ], axis=1)
    
    return df_res

# %%
 get_knn(data,7,8, 'haversine')

# %% [markdown]
# ## Creating data frame with the hiking trails

# %%

hiking_location = pd.DataFrame({ 'Trail_name': ["Bear Lake Loop","Maroon Lake Scenic Loop Trail","Chautauqua Trail","Buffalo Canyon Trail","Spud Lake Trail","Grizzly Creek Trail","Riverfront Trail","Riverbend Ponds Natural Area"],
                'Latitude': ["40.31196","39.09991","40.0008","38.8110","37.4286","39.4475","39.0742","40.5456"],
                'Longitude':["-105.64581","-106.94192","-105.2836","-104.8599","-107.7794","-107.3300","-108.5506","-105.0129"]})

hiking_location
hiking_location['Latitude'] = pd.to_numeric(hiking_location['Latitude'], errors='coerce')
hiking_location['Longitude'] = pd.to_numeric(hiking_location['Longitude'], errors='coerce')

# %% [markdown]
# ## Visualization of base model route 

# %%
route_coords = [
    (40.31196, -105.64581), # Bear Lake Loop
    (39.09991, -106.94192), #Maroon Lake Scenic Loop Trail
    (29.951722,-95.237709), #East-West and Deer Trail Loop
    (40.0008,-105.2836),   #Chautauqua Trail
    (38.811,-104.8599), #Buffalo Canyon Trail
    (37.4286,-107.7794),  #Spud Lake Trail
    (39.4475,-107.33), #Grizzly Creek Trail (first 2 miles)
    (39.0742,-108.5506), #Riverfront Trail
    (40.5456,-105.0129)#Riverbend Ponds Natural Area
]

m = folium.Map(location= [40.31196, -105.64581], zoom_start =5)

for coord in route_coords:
    folium.Marker(location=coord).add_to(m)
# Adding arrows to show direction along the route
for i in range (len(route_coords) -1):
    start= route_coords[i]
    end= route_coords[i + 1]
    plugins.PolyLineOffset(locations= [start, end],color='blue', weight=5, 
                           opacity=0.7, offset=0, dash_array='5,10').add_to(m)
    plugins.BeautifyIcon(icon_shape='arrow', border_color='blue', text_color='blue', icon='arrow-right').add_to(folium.Marker(location=end))
                         
                         
m.save('route_map_with_arrows.html')                      
print("Route map has been saved to 'route_map_with_arrows.html'.")

# %% [markdown]
# ## Optimized route

# %%
hiking_location['Latitude'] = pd.to_numeric(hiking_location['Latitude'], errors='coerce')
hiking_location['Longitude'] = pd.to_numeric(hiking_location['Longitude'], errors='coerce')

loc_rad = np.radians(hiking_location[['Latitude','Longitude']].values)
nbrs = NearestNeighbors(n_neighbors=len(hiking_location), metric= 'haversine')
nbrs.fit(loc_rad)


loc_visited = [0]
total_distance = 0
loc_current = 0

while len (loc_visited) < len(hiking_location):
    distances, indices = nbrs.kneighbors([loc_rad[loc_current]])
    for ind, dist in zip(indices[0], distances[0]):
        if ind not in loc_visited: 
            loc_visited.append(ind)
            total_distance += dist* 6371 
            current = ind  
total_distance == np.linalg.norm(loc_rad[loc_current] - loc_rad[0]) * 6371
loc_visited.append(0)
print("Total distance of optimized model:",total_distance)
print(loc_visited)

# %% [markdown]
# ### Visualization of optimized route

# %%
import folium
from folium import plugins

route_coords = [
    (40.31196, -105.64581), # Bear Lake Loop
    (40.0008,-105.2836),  #Chautauqua Trail
    (40.5456,-105.0129), #Riverbend Ponds Natural Area
    (39.4475,-107.33), #Grizzly Creek Trail (first 2 miles)
    (39.09991, -106.94192), #Maroon Lake Scenic Loop Trail
    (38.811,-104.8599), #Buffalo Canyon Trail
    (39.0742,-108.5506), #Riverfront Trail
    (37.4286,-107.7794),  #Spud Lake Trail
    (40.31196, -105.64581), # Bear Lake Loop
]
m = folium.Map(location= [40.31196, -105.64581], zoom_start =5)
for coord in route_coords:
    folium.Marker(location=coord).add_to(m)
# Adding arrows to show direction along the route
for i in range (len(route_coords) -1):
    start= route_coords[i]
    end= route_coords[i + 1]
    plugins.PolyLineOffset(locations= [start, end],color='blue', weight=5, opacity=0.7, offset=0, dash_array='5,10').add_to(m)
    plugins.BeautifyIcon(icon_shape='arrow', border_color='blue', text_color='blue', icon='arrow-right').add_to(folium.Marker(location=end))                                              
m.save('optimized route_map.html')                      
print("Route map has been saved to 'optimized route_map_with_arrows.html'.")


