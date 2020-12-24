import React, { cloneElement, Children } from "react";
import AccordionItem from './AccordianItem';

function Accordion({ id, children }) {
  return (
    <div className="accordion" id={`accordian${id}`}>
      {Children.map(children, child => 
        cloneElement(child, { parentId: id })
      )}
    </div>
  );
}

Accordion.Item = AccordionItem;

export default Accordion;
