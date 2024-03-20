import { Conditions } from '@app/types';
import moment from 'moment-timezone';

import FontAwesome from './icons/FontAwesome';

type Props = {
  conditions: string;
  sunset: string;
  sunrise: string;
  timeZone?: string;
  width?: number | string;
  height?: number | string;
};

const ConditionIcon: React.FC<Props> = ({
  conditions,
  timeZone,
  sunrise,
  sunset,
  width,
  height,
}) => {
  const currentTimezone = moment().tz(timeZone || 'Asia/Tehran');
  const time =
    currentTimezone.isBefore(
      currentTimezone.toISOString().split('T')[0] + 'T' + sunrise
    ) ||
    currentTimezone.isAfter(
      currentTimezone.toISOString().split('T')[0] + 'T' + sunset
    )
      ? 'night'
      : 'day';

  if (conditions.includes(',')) {
    const split = conditions.split(',');
    return (
      <>
        {split.map((c, idx) => {
          return (
            <div key={idx + 'icon'}>
              <FontAwesome
                time={time}
                type={c.trimStart().replace(' ', '') as Conditions}
                width={width || 40}
                height={height || 40}
                unkey={idx + 'svg'}
                key={idx + currentTimezone.toString()}
              />
            </div>
          );
        })}
      </>
    );
  }

  return (
    <FontAwesome
      time={time}
      type={conditions.trimStart().replace(' ', '') as Conditions}
      width={width || 40}
      height={height || 40}
      key={Math.floor(Math.random() * 2000)}
    />
  );
};

export default ConditionIcon;
