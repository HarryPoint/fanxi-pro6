import classNames from "classnames";
import { CSSProperties } from "react";

const Icon: React.FC<{
  type: string;
  style?: CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}> = (props) => {
  const { type, style, className, onClick } = props;
  return (
    <svg
      className={classNames(["icon", className])}
      aria-hidden="true"
      style={style}
      onClick={onClick}
    >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
};

export default Icon;
