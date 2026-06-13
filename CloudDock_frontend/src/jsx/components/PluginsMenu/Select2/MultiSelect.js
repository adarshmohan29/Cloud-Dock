import React, { useEffect,useState } from "react";
import axios from "axios";
import Select from "react-select";
import { colourOptions } from "./data";

const CustomClearText = () => "clear all";
const ClearIndicator = (props) => {
   const {
      children = <CustomClearText />,
      getStyles,
      innerProps: { ref, ...restInnerProps },
   } = props;
   return (
      <div
         {...restInnerProps}
         ref={ref}
         style={getStyles("clearIndicator", props)}
      >
         <div style={{ padding: "0px 5px" }}>{children}</div>
      </div>
   );
};

const ClearIndicatorStyles = (base, state) => ({
   ...base,
   cursor: "pointer",
   color: state.isFocused ? "blue" : "black",
});

export default function CustomClearIndicator() {

   const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

   const [data, setData] = useState([]);
   const [error, setError] = useState(null);
 
   const [colourOptions, setColourOptions] = useState([]);

  useEffect(() => {
    // Fetch data from API endpoint
    axios.get('http://localhost:3000/api/github/allrepos')
      .then(response => {
        const convertedData = response.data.map(project => ({
          value: project.name,
          label: project.name,
          color: getRandomColor(), // You need to implement getRandomColor function
        }));
        setColourOptions(convertedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

console.log("repo data"+data)

   return (
      <Select
         closeMenuOnSelect={false}
         components={{ ClearIndicator }}
         styles={{ clearIndicator: ClearIndicatorStyles }}
         defaultValue={ colourOptions[5]}
         options={colourOptions}
      />
   );
}
