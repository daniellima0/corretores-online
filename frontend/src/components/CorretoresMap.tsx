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

export default function CorretoresMap({ data }: { data: Broker[] }) {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      version="beta"
      libraries={["marker", "maps"]}
    >
      <Map data={data} />
    </Wrapper>
  );
}

const mapOptions = {
  mapId: "3148b0a282cfd2a4",
  center: {
    lat: -12.993966980061542,
    lng: -38.44557003269835,
  },
  clickableIcons: false,
  streetViewControl: true,
  mapTypeControl: false,
  fullscreenControl: false,
  zoom: 16,
};

function Map({ data }: { data: Broker[] }) {
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setMap(new window.google.maps.Map(ref.current, mapOptions));
    }
  }, []);

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

function Broker(props: { map: google.maps.Map | undefined; data: Broker[] }) {
  const [brokerData, setBrokerData] = useState<Broker[]>(props.data);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    setBrokerData(props.data);
  }, [props.data]);

  return (
    <>
      {brokerData.map((broker) => (
        <Marker
          key={broker.id}
          map={props.map}
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
    if (rootRef.current) {
      rootRef.current.render(children);
    }
    if (markerRef.current) {
      markerRef.current.position = position;
      markerRef.current.map = map;
      const listener = markerRef.current.addListener("click", onClick);
      return () => listener.remove();
    }
  }, [map, position, children, onClick]);

  return null;
}
