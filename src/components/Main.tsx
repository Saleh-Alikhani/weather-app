import { Row } from 'antd';

import { useGetWeatherByLocationsQuery } from '@/app/baseApi';

import ConditionIcon from './ConditionIcon';
import { StyledColumn, StyledTable, StyledText } from './Main.style';

type Props = {
  locations: Array<string>;
};

const Main: React.FC<Props> = (props) => {
  const { data } = useGetWeatherByLocationsQuery(props.locations.join('|'));

  return !data ? (
    <>Loading...</>
  ) : (
    <>
      <StyledTable
        dataSource={data.locations.map((l) => ({
          address: l.resolvedAddress,
          incoming: l.days.slice(1),
          today: l.days[0],
        }))}
        columns={[
          { title: 'Location', dataIndex: 'address', width: 480 },
          {
            title: 'Today',
            dataIndex: 'today',
            render: (value, _, index) => (
              <>
                {value.conditions.includes(',') ? (
                  <>
                    <ConditionIcon
                      conditions={value.conditions.split(',')[0]}
                      timeZone={data.locations[index].timezone}
                      sunrise={value.sunrise}
                      sunset={value.sunset}
                    />
                    <ConditionIcon
                      conditions={value.conditions.split(',')[1]}
                      timeZone={data.locations[index].timezone}
                      sunrise={value.sunrise}
                      sunset={value.sunset}
                    />
                  </>
                ) : (
                  <>
                    <ConditionIcon
                      conditions={value.conditions}
                      timeZone={data.locations[index].timezone}
                      sunrise={value.sunrise}
                      sunset={value.sunset}
                    />
                  </>
                )}
              </>
            ),
            width: 500,
          },
          {
            title: 'Incoming',
            dataIndex: 'incoming',
            render: (value, _, index) => {
              return (
                <Row justify="space-between" align="middle">
                  {value.map((v, i) =>
                    v.conditions.includes(',') ? (
                      <StyledColumn key={i} span={8}>
                        <StyledText>
                          {v.conditions.replaceAll(',', ' &')}
                        </StyledText>

                        <Row>
                          <ConditionIcon
                            conditions={v.conditions.split(',')[0]}
                            timeZone={data.locations[index].timezone}
                            sunrise={v.sunrise}
                            sunset={v.sunset}
                          />
                          <ConditionIcon
                            conditions={v.conditions.split(',')[1]}
                            timeZone={data.locations[index].timezone}
                            sunrise={v.sunrise}
                            sunset={v.sunset}
                          />
                        </Row>
                        <StyledText>{v.datetime}</StyledText>
                      </StyledColumn>
                    ) : (
                      <StyledColumn key={i} span={8}>
                        <StyledText>
                          {v.conditions.replaceAll(',', '&')}
                        </StyledText>

                        <ConditionIcon
                          conditions={v.conditions}
                          timeZone={data.locations[index].timezone}
                          sunrise={v.sunrise}
                          sunset={v.sunset}
                        />

                        <StyledText>{v.datetime}</StyledText>
                      </StyledColumn>
                    )
                  )}
                </Row>
              );
            },
          },
        ]}
      />
    </>
  );
};

export default Main;
