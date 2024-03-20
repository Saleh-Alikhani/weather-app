import {
  useGetCityByGeoCodeQuery,
  useGetWeatherByPositonQuery,
} from '@app/baseApi';
import { setSelectedCountry } from '@app/locationSlice';
import { Col, Row, Spin, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { X_ICON_PATH } from '../constants/common';
import ConditionIcon from './ConditionIcon';
import Loading from './Loading';
import {
  StyledActionWrapper,
  StyledCard,
  StyledConditionsHeader,
  StyledConditionsWrapper,
  StyledDivider,
  StyledNoMarginTitle,
} from './SingleLocation.style';

type Props = {
  location: string;
};

const SingleLocation: React.FC<Props> = (props) => {
  const { data, isLoading } = useGetWeatherByPositonQuery(props.location);
  const { data: geoData, isLoading: isGeoLoading } = useGetCityByGeoCodeQuery(
    props.location
  );
  const dispatch = useDispatch();

  return isLoading || !data ? (
    <Loading />
  ) : (
    <StyledCard
      title={
        <Row justify="center">
          <StyledNoMarginTitle level={2}>
            {isGeoLoading ? (
              <Spin />
            ) : isNaN(+data?.resolvedAddress.split(',')[0]) &&
              isNaN(+data?.resolvedAddress.split(',')[1]) ? (
              data.resolvedAddress
            ) : (
              geoData?.city + ', ' + geoData?.region
            )}
          </StyledNoMarginTitle>
        </Row>
      }
      actions={data.days.slice(1, 4).map((d, i) => (
        <StyledActionWrapper key={i}>
          <Row justify="center">{d.datetime}</Row>
          <Row align="middle" justify="center">
            <Col span={12}>
              <Row justify="center">
                <ConditionIcon
                  conditions={d.conditions}
                  sunrise={d.sunrise}
                  sunset={d.sunset}
                  height={60}
                  width={60}
                />
              </Row>
            </Col>
            <Col span={12}>
              <Row>{d.conditions}</Row>
              <Row>Minimum temprature:{d.tempmin}°C</Row>
              <Row>Maximum temprature:{d.tempmax}°C</Row>
            </Col>
          </Row>
        </StyledActionWrapper>
      ))}
      extra={
        <svg
          viewBox="0 0 384 512"
          width={10}
          onClick={() => dispatch(setSelectedCountry(''))}
          cursor="pointer"
        >
          <path d={X_ICON_PATH} />
        </svg>
      }
    >
      <Row justify="space-between">
        <StyledConditionsWrapper span={11}>
          <StyledConditionsHeader justify="center">
            Current Condition
          </StyledConditionsHeader>
          <Row>
            <Col span={12}>
              <Row justify="center">
                <ConditionIcon
                  conditions={data.currentConditions.conditions}
                  sunrise={data.days[0].sunrise}
                  sunset={data.days[0].sunset}
                  width={90}
                  height={90}
                />
              </Row>
            </Col>
            <Col span={12}>
              <Typography.Title level={3}>
                {data.currentConditions.conditions}
              </Typography.Title>
              <Typography.Paragraph>
                temprature:{data.currentConditions.temp}°C
              </Typography.Paragraph>
            </Col>
          </Row>
        </StyledConditionsWrapper>
        <StyledDivider type="vertical" />
        <StyledConditionsWrapper span={11}>
          <StyledConditionsHeader justify="center">
            Forecasted Condition
          </StyledConditionsHeader>
          <Row>
            <Col span={12}>
              <Row justify="center">
                <ConditionIcon
                  conditions={data.days[0].conditions}
                  sunrise={data.days[0].sunrise}
                  sunset={data.days[0].sunset}
                  width={90}
                  height={90}
                />
              </Row>
            </Col>
            <Col span={12}>
              <Typography.Title level={3}>
                {data.days[0].conditions}
              </Typography.Title>
              <Typography.Paragraph>
                temprature:{data.days[0].temp}°C
              </Typography.Paragraph>
            </Col>
          </Row>
        </StyledConditionsWrapper>
      </Row>
    </StyledCard>
  );
};

export default SingleLocation;
