// This component sole purpose is to have the id "mapa" in the DOM while the 
// MapView component (which also has the id "mapa") isn't mounted, so that 
// I can use it as a target to scroll to the map when the user searchs a location.
// When the MapView component is mounted, this component is hidden.

const ArmengueComponent = ({ hidden }: { hidden?: boolean }) => {
  return hidden ? <div id="mapa"></div> : null;
};

export default ArmengueComponent;
