import React from "react";
import { Button } from "@hybrid/components";

export function Header() {
  return (
    <header>
      <div className="headerContainer">
        <h1>Your Hybrid Comparison</h1>
        <Button
          className="closeButton"
          iconType={Button.iconType.CloseImage}
        ></Button>
      </div>
    </header>
  );
}
