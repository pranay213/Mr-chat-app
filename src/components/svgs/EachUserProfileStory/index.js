import * as React from "react";
import "./index.css";

const EachUserProfileStory = (props) => {
  const { userdata } = props;
  const { id, name, imgUrl } = userdata;
  return (
    <div className="svg-icon-container">
      <svg
        width={60}
        height={90}
        viewBox="0 0 69 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
      >
        <circle cx={34.5} cy={34.5} r={29.5} fill={`url(#pattern${id})`} />
        <circle
          cx={34.5}
          cy={34.5}
          r={33.5}
          stroke="#FFCB45"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <defs>
          <pattern
            id={`pattern${id}`}
            patternContentUnits="objectBoundingBox"
            width={1}
            height={1}
          >
            <use xlinkHref={`#${id}`} transform="scale(0.0153846)" />
          </pattern>
          <image id={id} width={65} height={65} xlinkHref={imgUrl} />
        </defs>
      </svg>
      <p className="user-name-svg">{name}</p>
    </div>
  );
};
export default EachUserProfileStory;
