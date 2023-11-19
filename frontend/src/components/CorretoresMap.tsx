import { Wrapper } from "@googlemaps/react-wrapper";
import { Avatar, Button } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { Root, createRoot } from "react-dom/client";
import HiddenComponent from "./HiddenComponent";

type Broker = {
  id: number;
  name: string;
  position: { lat: number; lng: number };
};

type MapProps = {
  map: google.maps.Map | undefined;
  data: Broker[];
};

export default function CorretoresMap({
  data,
  searchMapCenter,
  dataFilter,
}: {
  data: Broker[];
  searchMapCenter: { lat: number; lng: number } | null;
  dataFilter: any;
}) {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      version="beta"
      libraries={["marker", "maps", "geometry"]}
    >
      <Map
        data={data}
        searchMapCenter={searchMapCenter}
        dataFilter={dataFilter}
      />
    </Wrapper>
  );
}

function Map({
  data,
  searchMapCenter,
  dataFilter,
}: {
  data: Broker[];
  searchMapCenter: { lat: number; lng: number } | null;
  dataFilter: any;
}) {
  const [map, setMap] = useState<google.maps.Map>();
  const [circle, setCircle] = useState<google.maps.Circle | null>();
  const [auxMarker, setAuxMarker] = useState<google.maps.Marker | null>();
  const [brokersInCircle, setBrokersInCircle] = useState<Broker[] | undefined>(
    data
  );

  const ref = useRef<HTMLDivElement>(null);
  const mapOptions = {
    mapId: "3148b0a282cfd2a4",
    center: { lat: -12.976982096232536, lng: -38.455293915342516 },
    clickableIcons: false,
    streetViewControl: true,
    mapTypeControl: false,
    fullscreenControl: false,
    zoom: 16,
  };

  useEffect(() => {
    if (ref.current) {
      setMap(new window.google.maps.Map(ref.current, mapOptions));
    }
  }, []);

  useEffect(() => {
    if (map && searchMapCenter) {
      setAuxMarker(
        new google.maps.Marker({
          map,
          position: searchMapCenter,
        })
      );
    }
  }, [map, searchMapCenter]);

  useEffect(() => {
    async function getBrokersInCircle() {
      if (searchMapCenter) {
        const { spherical } = (await google.maps.importLibrary(
          "geometry"
        )) as google.maps.GeometryLibrary;
        const brokersInCircleData = data
          .map((broker) => {
            let distance = spherical.computeDistanceBetween(
              new google.maps.LatLng(broker.position),
              new google.maps.LatLng(searchMapCenter)
            );
            return distance <= 500 ? broker : null;
          })
          .filter((broker): broker is Broker => broker !== null);
        setBrokersInCircle(brokersInCircleData);
        dataFilter(brokersInCircleData);
      } else {
        setBrokersInCircle([]);
      }
    }

    if (circle) {
      circle.setMap(null);
    }
    if (map && searchMapCenter) {
      map.panTo(searchMapCenter);
      setCircle(
        new google.maps.Circle({
          strokeColor: "#1C5E9F",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#1C5E9F",
          fillOpacity: 0.1,
          map,
          center: searchMapCenter,
          radius: 500,
        })
      );
      getBrokersInCircle();
    }
  }, [map, searchMapCenter]);

  useEffect(() => {
    dataFilter(brokersInCircle);
  }, [brokersInCircle, dataFilter]);

  let props = {
    map: map,
    data: data,
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%" }} ref={ref} />
      {map && <Broker {...props} />}
    </>
  );
}

function Broker(props: MapProps) {
  const { map, data } = props;
  const [brokerData, setBrokerData] = useState<Broker[]>(data);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    setBrokerData(data);
  }, [props.data]);

  return (
    <>
      {brokerData.map((broker) => (
        <Marker
          key={broker.id}
          map={map}
          position={broker.position}
          onClick={() => {
            console.log("teste");
          }}
        >
          <HiddenComponent hidden={broker.id === hover}>
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "row",
                boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.2)",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "11px",
              }}
              onMouseEnter={() => setHover(broker.id)}
              onMouseLeave={() => setHover(null)}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: "15px",
                  bgcolor: "#FF5E00",
                }}
              >
                {broker.name.charAt(0)}
              </Avatar>
            </div>
          </HiddenComponent>
          <HiddenComponent hidden={broker.id != hover}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "row",
                boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.2)",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "11px",
              }}
              onMouseEnter={() => setHover(broker.id)}
              onMouseLeave={() => setHover(null)}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: "15px",
                  bgcolor: "#FF5E00",
                }}
              >
                {broker.name.charAt(0)}
              </Avatar>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "3px",
                }}
              >
                {broker.name}
                <Button
                  style={{
                    width: "100px",
                    height: "30px",
                    fontSize: "9px",
                    backgroundColor: "#1C5E9F",
                    boxShadow: "none",
                  }}
                  variant="contained"
                >
                  Visitar perfil
                </Button>
              </div>
            </div>
          </HiddenComponent>
        </Marker>
      ))}
    </>
  );
}

function Marker({
  map,
  position,
  children,
  onClick,
}: {
  map: google.maps.Map | undefined;
  position: { lat: number; lng: number };
  children: React.ReactNode;
  onClick: () => void;
}) {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const rootRef = useRef<Root | null>(null);

  useEffect(() => {
    async function importMarkerElement() {
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      if (!rootRef.current && !markerRef.current) {
        const container = document.createElement("div");
        console.log("Creating marker");
        rootRef.current = createRoot(container);
        markerRef.current = new AdvancedMarkerElement({
          map: map,
          position: position,
          content: container,
        });
      }
    }

    importMarkerElement();

    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
    };
  }, [map, position]);

  useEffect(() => {
    console.log(rootRef.current);
    if (rootRef.current) {
      rootRef.current.render(children);
    }
    if (markerRef.current) {
      markerRef.current.position = position;
      markerRef.current.map = map;
      const listener = markerRef.current.addListener("gmp-click", onClick);
      return () => listener.remove();
    }
  }, [map, position, children, onClick, rootRef.current]);

  return null;
}
