import React, {useState} from "react";

const HoverDiv = ({ handleMouseOver, handleMouseOut }) => {
    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <span>
                hover over me
            </span>
        </div>
    );
};

const HoverText = () => {
    return (
        <div>
            You are Hovering!
        </div>
    );
};

const HoverTemplate = () => {
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
    };
    
    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <div>
            {isHovering && <HoverText />}
            <HoverDiv
                handleMouseOver={handleMouseOver}
                handleMouseOut={handleMouseOut}
            />
        </div>
    );
};

export default HoverTemplate