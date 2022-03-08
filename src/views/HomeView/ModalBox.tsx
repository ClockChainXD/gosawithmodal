import { FC } from "react";
const ModalBox:FC<{}> = ({ children }) => {
  return (
    <div className="gosaaa_tm_modalbox opened">
      <div className="box_inner_">
        <div className="description_wrap">{children}</div>
      </div>
    </div>
  );
};

export default ModalBox;
