// import React, { useRef } from "react";
// import "./menu-btn.scss";
// export default function MenuBtn({ open, onClickFn }) {
//   const btnRef = useRef();
//   return (
//     <div onClick={() => {
//       onClickFn(!open)
//     }} className={`menu-btn ${open ? "open" : ""}`}>
//       <div ref={btnRef} className="menu-btn__burger"></div>
//     </div>
//   );
// }
import React, { useRef } from "react";
import "./menu-btn.scss";

interface MenuBtnProps {
  open: boolean;
  onClickFn: (open: boolean) => void;
}

export default function MenuBtn({ open, onClickFn }: MenuBtnProps): JSX.Element {
  const btnRef = useRef<HTMLDivElement>(null);

  return (
    <div
      onClick={() => {
        onClickFn(!open);
      }}
      className={`menu-btn ${open ? "open" : ""}`}
    >
      <div ref={btnRef} className="menu-btn__burger"></div>
    </div>
  );
}
