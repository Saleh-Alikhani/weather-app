import { Conditions } from '@app/types';

import { ICON_PROPS } from '../../constants/common';

type Props = {
  width: number | string;
  height: number | string;
  type: Conditions;
  time: 'day' | 'night';
  unkey?: number | string;
};

const FontAwesome: React.FC<Props> = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      key={props.unkey}
      {...ICON_PROPS[props.type][props.time].svg}
    >
      {ICON_PROPS[props.type][props.time].paths.map((p, i) => (
        <>
          <path key={i} {...p} />s
        </>
      ))}
    </svg>
  );
};

export default FontAwesome;
