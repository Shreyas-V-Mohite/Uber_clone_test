import React, { useState } from "react";
import { LoadScriptNext, Autocomplete } from "@react-google-maps/api";
import { Form, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";


const GOOGLE_MAPS_API_KEY = "AIzaSyCoN0Iw_IdrhQ8xfna5uSAWin9M8I1Qcgg";
console.log(GOOGLE_MAPS_API_KEY);
const libraries = ["places"];

const GoogleMapsSearch = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState("");

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        setAddress(place.formatted_address);
      }
    }
  };

  return (
    <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <Autocomplete
        onLoad={(auto) => setAutocomplete(auto)}
        onPlaceChanged={handlePlaceSelect}
      >
        <Form className="d-flex mx-auto" onSubmit={(e) => e.preventDefault()}>
          <FormControl
            type="search"
            placeholder="Search Google Maps"
            className="me-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="outline-success">
            <FaSearch />
          </Button>
        </Form>
      </Autocomplete>
    </LoadScriptNext>
  );
};

export default GoogleMapsSearch;
