import React from 'react';

function Modal({ id, buttonText, buttonIcon, className, title, children }) {
    return (
        <div>
            <button 
                type="button" 
                className={!className ? 'btn btn-primary' : className} 
                data-toggle="modal" data-target={`#${id}`}
            >
                <i className={buttonIcon}></i>
                {buttonText}
            </button>

            <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel" style={{ color: "black" }}>
                        {title}
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body" style={{ padding: "0px" }}>
                    {children}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
