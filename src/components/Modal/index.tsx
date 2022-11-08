import React from "react";
import "./style.css";

interface ModalProps {
    isOpen: boolean;
    onCloseModal: () => void;
    children: React.ReactNode;
}

const Modal = (props: ModalProps) =>
    <div className="modalWrapper">
        <div className="mainModal">
            <section className="modalBox">
                <a href="#!" onClick={(event) => { event.preventDefault(); props.onCloseModal(); }}>
                    <svg className="closeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.49 10.48" id="close-icon" height="14px" width="14px">
                        <g data-name="Layer 2">
                            <path d="M5.24 3.83L8.78.29a1 1 0 111.41 1.41L6.66 5.24l3.54 3.54a1 1 0 11-1.41 1.41L5.24 6.66l-3.53 3.53A1 1 0 01.29 8.78l3.54-3.54L.29 1.71A1 1 0 011.71.29z" data-name="Layer 1" />
                        </g>
                    </svg>
                </a>
                <div className="modalContent">{props.children}</div>
            </section>
        </div>
    </div>

export default Modal;