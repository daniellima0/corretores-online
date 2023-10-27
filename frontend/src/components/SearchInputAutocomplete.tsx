import { Wrapper } from "@googlemaps/react-wrapper";
import { TextField } from "@mui/material";
import { useState, useRef, useEffect } from "react";

export default function SearchInputAutocomplete() {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      version="beta"
      libraries={["places"]}
    >
      <Input />
    </Wrapper>
  );
}

const autocompleteOptions = {
  componentRestrictions: { country: "BR" },
};

function Input() {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      setAutocomplete(
        new window.google.maps.places.Autocomplete(
          ref.current,
          autocompleteOptions
        )
      );
      autocomplete?.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log(place);
      });
    }
  }, []);

  return (
    <>
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        ref={ref}
      />
    </>
  );
}
