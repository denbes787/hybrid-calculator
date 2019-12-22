import React from "react";
import Arrow from "../assets/images/arrow.png";

export function Footer({ disclaimersInfo }: { disclaimersInfo: any }) {
  return (
    <footer>
      <div className="footerContainer">
        <h4>
          <img src={Arrow} className="arrowSign" alt="arrowSign" />
          Disclaimers
        </h4>
        <div className="footerDisclaimerBox">
          {disclaimersInfo &&
            disclaimersInfo.map((item: any) => (
              <p key={item} className="body2">
                {item}
              </p>
            ))}
        </div>
      </div>
    </footer>
  );
}
