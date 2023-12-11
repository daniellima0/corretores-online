import { Wrapper } from "@googlemaps/react-wrapper";
import { Avatar, Button } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { Root, createRoot } from "react-dom/client";
import HiddenComponent from "./HiddenComponent";
import { RealtorType } from "types/RealtorType";

interface CorretoresMapProps {
  data: RealtorType[];
  searchMapCenter: { lat: number; lng: number } | null;
  dataFilter: React.Dispatch<React.SetStateAction<RealtorType[]>>;
}

export default function CorretoresMap({
  data,
  searchMapCenter,
  dataFilter,
}: CorretoresMapProps) {
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

interface MapProps2 {
  data: RealtorType[];
  searchMapCenter: { lat: number; lng: number } | null;
  dataFilter: React.Dispatch<React.SetStateAction<RealtorType[]>>;
}

function Map({ data, searchMapCenter, dataFilter }: MapProps2) {
  const [map, setMap] = useState<google.maps.Map>();
  const [circle, setCircle] = useState<google.maps.Circle | null>();
  const [brokersInCircle, setBrokersInCircle] = useState<
    RealtorType[] | undefined
  >(data);

  const ref = useRef<HTMLDivElement>(null);
  const mapOptions = {
    mapId: "abc9203fc784d845",
    center: { lat: -12.976982096232536, lng: -38.455293915342516 },
    clickableIcons: false,
    streetViewControl: true,
    mapTypeControl: false,
    fullscreenControl: false,
    zoom: 14,
  };

  useEffect(() => {
    if (ref.current) {
      setMap(new window.google.maps.Map(ref.current, mapOptions));
    }
  }, []);

  useEffect(() => {
    async function getBrokersInCircle() {
      if (data) {
        if (searchMapCenter) {
          const { spherical } = (await google.maps.importLibrary(
            "geometry"
          )) as google.maps.GeometryLibrary;

          const brokersInCircleData = data
            .map((broker) => {
              const distance = spherical.computeDistanceBetween(
                new google.maps.LatLng({
                  lat: Number(broker.realtor_location.latitude),
                  lng: Number(broker.realtor_location.longitude),
                }),
                new google.maps.LatLng(searchMapCenter)
              );
              return distance <= 2000 ? broker : null;
            })
            .filter((broker): broker is RealtorType => broker !== null);
          setBrokersInCircle(brokersInCircleData);
          dataFilter(brokersInCircleData);
        } else {
          setBrokersInCircle(data);
        }
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
          radius: 2000,
        })
      );
      getBrokersInCircle();
    }
  }, [map, searchMapCenter]);

  useEffect(() => {
    dataFilter(brokersInCircle);
  }, [brokersInCircle, dataFilter]);

  const props = {
    map: map,
    data: data,
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
        ref={ref}
      />
      {map && <Broker {...props} />}
    </>
  );
}

type MapProps = {
  map: google.maps.Map | undefined;
  data: RealtorType[];
};

function Broker(props: MapProps) {
  const { map, data } = props;
  const [brokerData, setBrokerData] = useState<RealtorType[]>(data);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    setBrokerData(data);
  }, [props.data]);

  return (
    <>
      {data &&
        brokerData.map((broker) => (
          <Marker
            key={broker.user.user_id}
            map={map}
            position={{
              lat: Number(broker.realtor_location.latitude),
              lng: Number(broker.realtor_location.longitude),
            }}
            onClick={() => {
              setHover(broker.user.user_id);
            }}
          >
            <HiddenComponent hidden={broker.user.user_id === hover}>
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
                onMouseEnter={() => setHover(broker.user.user_id)}
                onMouseLeave={() => setHover(null)}
              >
                <Avatar
                  alt={broker.user.name}
                  src=""
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: "15px",
                    bgcolor: "#FF5E00",
                  }}
                />
              </div>
            </HiddenComponent>
            <HiddenComponent hidden={broker.user.user_id != hover}>
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
                onMouseEnter={() => setHover(broker.user.user_id)}
                onMouseLeave={() => setHover(null)}
              >
                <Avatar
                  alt={broker.user.name}
                  src=""
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: "15px",
                    bgcolor: "#FF5E00",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  {broker.user.name}
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
      const { AdvancedMarkerElement, CollisionBehavior } =
        (await google.maps.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;

      if (!rootRef.current && !markerRef.current) {
        const container = document.createElement("div");
        rootRef.current = createRoot(container);
        markerRef.current = new AdvancedMarkerElement({
          map: map,
          position: position,
          content: container,
          collisionBehavior:
            CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
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
      const listener = markerRef.current.addListener("gmp-click", onClick);
      return () => listener.remove();
    }
  }, [map, position, children, onClick, rootRef.current]);

  return null;
}
