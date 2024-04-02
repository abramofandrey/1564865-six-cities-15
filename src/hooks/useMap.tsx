import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Map, TileLayer} from 'leaflet';
// import { TLocation } from '../types/location';

import { TILE_LAYER, COPYRIGHT } from '../const';
import { TCity } from '../types/city';

type TUseMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  city: TCity;
}

function useMap({ mapRef, city }: TUseMapProps
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });
      const layer = new TileLayer(TILE_LAYER,
        {
          attribution: COPYRIGHT
        }
      );
      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
