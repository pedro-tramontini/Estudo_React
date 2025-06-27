import { useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, ScaleControl, GeoJSON, useMapEvent, useMap } from 'react-leaflet';
import { Grid } from '@mui/material';


import features from "./vertopal.com_Divisoes_mapa_RS_json.json"

const App = () => {
  const position = {lng: -53.01521469802669, lat: -28.71292197474028}


const onEachFeature = (prop, layer) => {
  layer.options.fillcolor = prop.properties.color;
  
  const areaAtuacao = prop.properties.AREA_ATUACAO;
  
  areaAtuacao ? layer.bindPopup(`AREA DE ATUAÇÃO: ${areaAtuacao}`) : layer.bindPopup(`NÃO FAZ PARTE DA AREA DE ATUAÇÃO DA COPREL`) 
}


let location = {
      SouthWest: null,
      NorthEast: null,
      NorthWest: null,
      SouthEast: null
}

const LocationResponse = () => {
  const map = useMap();

  map.whenReady(() => {
    location = {
    SouthWest: map.getBounds().getSouthWest(),
    NorthEast: map.getBounds().getNorthEast(),
    NorthWest: map.getBounds().getNorthWest(),
    SouthEast: map.getBounds().getSouthEast()
  }
    console.log(location)
    })

  useMapEvent('moveend', () => {
    const bounds = map.getBounds()
    location = {
      SouthWest: bounds.getSouthWest(),
      NorthEast: bounds.getNorthEast(),
      NorthWest: bounds.getNorthWest(),
      SouthEast: bounds.getSouthEast()
    }
    console.log(location)
    })
  return null
}

return (
    <Grid sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBlock: 12}}>


    <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{display: 'flex', alignItems: 'center',justifyContent: 'center', height: "70vh", width: "60%", borderRadius: "15px"}}>
      <ScaleControl position={'bottomright'}/>
      <TileLayer
        url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
        maxZoom= {20}
        subdomains={['mt1','mt2','mt3']}
      />

        <LayersControl>
          <LayersControl.BaseLayer name="OpenStreetMap">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer checked name="Google Maps">
                    <TileLayer
                        url="http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                        attribution="&copy; Google"
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Mapbox Map Satellite">
            <TileLayer
              attribution='&copy; <a href="https://www.mapbox.com">Mapbox</a> '
              url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}"
              accessToken={"your token here"}

            />
          </LayersControl.BaseLayer>
          
        </LayersControl>

      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

      <GeoJSON data={features} onEachFeature={onEachFeature}/>
      <LocationResponse />
    </MapContainer>
        </Grid>
  );
};

export default App;
