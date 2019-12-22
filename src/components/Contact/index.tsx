import React from "react";
import { Button } from "@hybrid/components";

export function Contact() {
  return (
    <div className="contactSection">
      <div className="contactContainer">
        <h2>
          Find out more about your perfect Hybrid or speak to our specialist.
        </h2>
        <Button className="primaryButton">Explore Now</Button>
        <Button className="secondaryButton">Get In Touch</Button>
      </div>
    </div>
  );
}
