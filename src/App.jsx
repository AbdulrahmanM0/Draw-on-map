import { useState } from 'react'
import { MapContainer, TileLayer, FeatureGroup, Polygon } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import { EditControl } from "react-leaflet-draw"
import { stateData } from './regions'

function App() {
  const position = [24.774265, 46.738586];
  const [charts, setCharts] = useState([]);
  const [allChanges, setAllChanges] = useState([]);

  const _created = e => {
    const coordinates = e.layer.getLatLngs()[0].map(point => ({
      lat: point.lat, lng: point.lng
    }));
    setCharts(charts => [...charts, coordinates]);
  };

  const _edit = e => {
    const editedPolygons = e.layers.getLayers().map(layer => {
      if (layer instanceof window.L.Polygon) {
        return layer.getLatLngs()[0].map(point => ({
          lat: point.lat, lng: point.lng
        }));
      }
      return null;
    }).filter(polygon => polygon !== null);
    const editedPoints = editedPolygons[0];


  };

  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].lat !== arr2[i].lat || arr1[i].lng !== arr2[i].lng) {
        return false;
      }
    }
    return true;
  };


  console.log(charts)
  console.log(allChanges)
  return (
    <>
      <MapContainer center={position} zoom={6} scrollWheelZoom={false}>
        <FeatureGroup>
          <EditControl
            position='topright'
            onCreated={_created}
            onEdited={_edit}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false
            }}
          />
        </FeatureGroup>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {
          stateData.map((item, key) => {
            const boundaries = item.boundaries[0];
            return (
              <Polygon
                key={key}
                pathOptions={{
                  fillColor: "#FD8D3C",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  dashArray: 3,
                  color: "white"
                }}
                positions={boundaries}
              />
            );
          })
        }
      </MapContainer>
    </>
  );
}

export default App;