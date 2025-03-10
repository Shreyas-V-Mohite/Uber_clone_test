// import React, { useState } from "react";
// import axios from "axios";
// import { Form, FormControl, Button } from "react-bootstrap";
// import { FaSearch } from "react-icons/fa";

// const AddressSearch = ({ onSelect }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
  
//   const handleInputChange = async (e) => {
//     const value = e.target.value;
//     setQuery(value);
    
//     if (value.length > 2) {
//       try {
//         const response = await axios.get(
//           `https://nominatim.openstreetmap.org/search`,
//           {
//             params: {
//               q: value,
//               format: "json",
//               addressdetails: 1,
//               limit: 5,
//             },
//           }
//         );
//         setSuggestions(response.data.slice(0, 5));
//       } catch (error) {
//         console.error("Error fetching address suggestions:", error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSelect = (suggestion) => {
//     setQuery(suggestion.display_name);
//     setSuggestions([]);
//     if (onSelect) {
//       onSelect({
//         address: suggestion.display_name,
//         lat: suggestion.lat,
//         lon: suggestion.lon,
//       });
//     }
//   };

//   return (
//     <div className="address-search" style={{ position: "relative", zIndex: 1000 }}>
//       <Form className="d-flex mx-auto">
//         <FormControl
//           type="search"
//           placeholder="Enter"
//           className="me-2"
//           value={query}
//           onChange={handleInputChange}
//         />
//         <Button variant="outline-success"><FaSearch /></Button>
//       </Form>
//       {suggestions.length > 0 && (
//         <ul className="suggestions" style={{ position: "absolute", background: "white", listStyle: "none", padding: "5px", margin: 0, border: "1px solid #ccc", width: "100%" }}>
//           {suggestions.map((suggestion) => (
//             <li key={suggestion.place_id} onClick={() => handleSelect(suggestion)} style={{ padding: "5px", cursor: "pointer" }}>
//               {suggestion.display_name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AddressSearch;

import React, { useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";

const AddressSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("Search Places"); // Default button text
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: value,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
          }
        );
        setSuggestions(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    let addressParts = suggestion.display_name.split(",");
    let street = addressParts.length > 0 ? addressParts[0].trim() : suggestion.display_name;

    setQuery(street); // ✅ Display only street name
    setSuggestions([]);
    setShowDropdown(false);

    if (onSelect) {
      onSelect({
        address: street,  // ✅ Send only street name
        fullAddress: suggestion.display_name, // ✅ Keep full address if needed
        lat: suggestion.lat,
        lon: suggestion.lon,
      });
    }
  };

  return (
    <div className="address-search" style={{ position: "relative", zIndex: 1000 }}>
      {/* Styled Button that Opens Search */}
      <div
        className="address-button"
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          display: "flex",
          alignItems: "center",
          background: "#fff",
          border: "1px solid #ccc",
          padding: "8px 12px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "500",
          gap: "8px",
          width: "fit-content",
        }}
      >
        <FaMapMarkerAlt style={{ color: "black" }} />
        <span>{query}</span>
        <FaChevronDown style={{ marginLeft: "5px", color: "black" }} />
      </div>

      {/* Address Search Dropdown */}
      {showDropdown && (
        <div
          className="dropdown-container"
          style={{
            position: "absolute",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "5px",
            marginTop: "5px",
            width: "250px",
          }}
        >
          <input
            type="text"
            placeholder="Enter location..."
            value={query === "Search Places" ? "" : query}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          />
          {suggestions.length > 0 && (
            <ul
              className="suggestions"
              style={{ listStyle: "none", padding: "0", margin: "0" }}
            >
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleSelect(suggestion)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressSearch;

