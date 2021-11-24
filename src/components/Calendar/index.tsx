import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  Calendar as CustomCalendar,
  LocaleConfig,
  CalendarProps,
} from "react-native-calendars";
import { ptBR } from "./locale.config";
import theme from "../../styles/theme";

import {generateIntervalDate} from './generateIntervalDate'

LocaleConfig.locales["pt-br"] = ptBR;

LocaleConfig.defaultLocale = "pt-br";

interface MarkedDateProps {
  [date: string]:{
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  }
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number; 
}

interface CustomCalendarProps extends CalendarProps{
  markedDate: MarkedDateProps;
}

function Calendar({onDayPress,markedDate, ...rest}:CustomCalendarProps) {
  return (
    <CustomCalendar 
      {...rest}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      renderArrow={(direction) => (
        <Feather
          name={direction == "left" ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.text}
        />
      )}
      theme={{
        textDayFontFamily: theme.fonts.primary400,
        textDayHeaderFontFamily: theme.fonts.primary500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={ markedDate }
      onDayPress={onDayPress}
    />
  );
}

export {
  Calendar,
  MarkedDateProps,
  DayProps,
  generateIntervalDate
}