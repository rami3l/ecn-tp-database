package ecn.tp.bddon.server.utils;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class DateParser {

    public static final List<String> DATE_FORMATS = List.of("yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm", "yyyy-MM-dd");

    private DateParser() {
        // utility class must not be implemented
    }

    /**
     * Try to parse date with date format stored in DateParse.DATE_FORMATS
     * 
     * @param date: String to parse
     * @return the date parsed
     */
    public static Date parseDateTime(String date) {
        if ("".equals(date) || date == null) {
            return null;
        }
        for (String dateFormat : DATE_FORMATS) {
            try {
                return (new SimpleDateFormat(dateFormat)).parse(date);
            } catch (Exception e) {
            }
        }
        throw new IllegalArgumentException("No format corresponding found");
    }

    public static java.sql.Date parseSqlDate(String date) {
        Date d = parseDateTime(date);
        return d == null ? null : new java.sql.Date(d.getTime());
    }

    /**
     * Try to parse date with format stored in DateParse.DATE_FORMATS
     * 
     * @param date: String to parse
     * @return the timestamp parsed from the date
     */
    public static Timestamp getTimeStampFromStringDate(String date) {
        Date d = parseDateTime(date);
        return d == null ? null : new Timestamp(d.getTime());
    }

}
