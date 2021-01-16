import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Trivia.css"

function Trivia({ number }) {
  const [trivia, setTrivia] = useState("");

  useEffect(() => {
    axios
      .get(`http://numbersapi.com/${number}/trivia`)
      .then(
        // success
        ({ data, status }) => {
          console.log('data', data);
          setTrivia(data)
          
        }
      )
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        console.log(error.config);
      });
  }, [number]);

  return (
    <div className="triv-number">
      <code>{trivia}</code>
    </div>
  );
}

export default Trivia;
