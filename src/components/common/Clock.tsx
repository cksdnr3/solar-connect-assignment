import React, { ReactElement, useEffect, useState } from 'react';
import { getDateString, getDayString, getMeridiemString } from 'utils/dateParser';
import styled from 'styled-components';

export default function Clock(): ReactElement {
    const [now, setNow] = useState(new Date());
    const [tickTock, setTickTock] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
          setNow(new Date());
          setTickTock(prev => !prev);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);


    const getTimeString = (time: number): string => time < 10 ? `0${time}` : `${time}`;

    return (
        <>
        <ClockWrapper>
            <DateBlock>
                <DayText>{getDayString(now)}</DayText>
                <DateText>{getDateString(now)}</DateText>
            </DateBlock>
            <TimeBlock>
                <Time>{getTimeString(now.getHours())}</Time>
                <Delimiter tickTock={tickTock} >{' : '}</Delimiter>
                <Time>{getTimeString(now.getMinutes())}</Time>
                <Time>{getMeridiemString(now)}</Time>
            </TimeBlock>
        </ClockWrapper>
        </>
    )
}

const ClockWrapper = styled.div`
    display: column;
    justify-content: center;
`

const DateBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const DayText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
`;

const TimeBlock = styled.div`
    display: flex;
    justify-content: center;
`

const Time = styled.span`
    font-size: 22px;
    color: #119955;
    padding-left: 10px;
`

const Delimiter = styled.span<{ tickTock?: boolean }>`
    font-size: 22px;
    padding-left: 10px;
    color: ${(props) => props.tickTock ? '#bcdeb0' : '#119955'};
`