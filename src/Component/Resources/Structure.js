import React from "react";
import Data from './Data';
import Resources from "./Resources";
import "./res.css";
// Structure.js
const Structure = () => {
    const cards = Data.map(item => {
        return (
            <Resources
                images={item.image}  
                type={item.type}
                title={item.title}
                text={item.description}
                link={item.link}
            />
        );
    });

    return <div>{cards}</div>;
};
export default Structure;