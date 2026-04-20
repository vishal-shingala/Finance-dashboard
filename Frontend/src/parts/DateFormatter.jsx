// Utility function to format date string with zero-padding
const formatDateString = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  return { dateOnly: `${day}-${month}-${year}`, dateTime: `${day}-${month}-${year}, ${time}` };
};

// React component for displaying full date and time
const DateFormatter = ({ isodate }) => {
  const { dateTime } = formatDateString(isodate);
  return <span>{dateTime}</span>;
};

// Utility function to get formatted date string only (for labels, etc.)
const DateFormat = (isodate) => {
  const { dateOnly } = formatDateString(isodate);
  return dateOnly;
};

export default DateFormatter;
export { DateFormat };