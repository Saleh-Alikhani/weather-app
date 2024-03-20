import { useGetWeatherByLocationsQuery } from '@app/baseApi';
import { setSelectedCountry } from '@app/locationSlice';
import { RootState } from '@app/store';
import { Col, Row, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import ConditionIcon from './ConditionIcon';
import {
  StyledColumn,
  StyledConditionRow,
  StyledFloatBtn,
  StyledTable,
  StyledText,
} from './Main.style';
import SingleLocation from './SingleLocation';

type Props = {
  locations: Array<string>;
};

const Main: React.FC<Props> = (props) => {
  const { data, isLoading } = useGetWeatherByLocationsQuery(
    props.locations.join('|')
  );
  const location = useSelector((state: RootState) => state.location);

  const router = useRouter();

  const dispatch = useDispatch();

  return location ? (
    <SingleLocation location={location} />
  ) : (
    <>
      <StyledTable
        loading={isLoading}
        onRow={(data) => ({
          onClick: () => dispatch(setSelectedCountry(data.address)),
        })}
        dataSource={data?.locations.map((l, i) => ({
          address: l.resolvedAddress,
          incoming: l.days.slice(1),
          today: l.days[0],
          key: i,
        }))}
        columns={[
          { title: 'Location', dataIndex: 'address', width: 480 },
          {
            title: 'Today',
            dataIndex: 'today',
            render: (value, _, index) => (
              <Row gutter={[20, 0]} key={index}>
                <Col span={6}>
                  <StyledConditionRow justify="center" align="middle">
                    <ConditionIcon
                      conditions={value.conditions}
                      timeZone={data?.locations[index].timezone}
                      sunrise={value.sunrise}
                      sunset={value.sunset}
                    />
                  </StyledConditionRow>
                </Col>
                <Col span={18}>
                  <Row>
                    <Typography.Text>{value.conditions}</Typography.Text>
                  </Row>
                  <Row>
                    <StyledText>
                      Minimum Temperature: {value.tempmin}°C
                    </StyledText>
                  </Row>
                  <Row>
                    <StyledText>Temperature: {value.temp}°C</StyledText>
                  </Row>
                  <Row>
                    <StyledText>
                      Maximum Temperature: {value.tempmax}°C
                    </StyledText>
                  </Row>
                </Col>
              </Row>
            ),
            width: 500,
          },
          {
            title: 'Incoming',
            dataIndex: 'incoming',
            render: (value: any[], _, index) => {
              return (
                <Row justify="space-between" align="middle" key={index}>
                  {value.map((v, i) => (
                    <StyledColumn key={i} span={8}>
                      <StyledText>
                        {v.conditions.replaceAll(',', '&')}
                      </StyledText>

                      <Row>
                        <ConditionIcon
                          conditions={v.conditions}
                          timeZone={data?.locations[index].timezone}
                          sunrise={v.sunrise}
                          sunset={v.sunset}
                        />
                      </Row>

                      <StyledText>{v.datetime}</StyledText>
                    </StyledColumn>
                  ))}
                </Row>
              );
            },
          },
        ]}
      />
      <StyledFloatBtn
        tooltip="Refresh"
        style={{ bottom: 100 }}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
          </svg>
        }
        onClick={() => router.refresh()}
      />
    </>
  );
};

export default Main;
