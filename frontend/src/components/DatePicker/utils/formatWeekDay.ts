export default function formatWeekDay(originalWeekDay: string): string {
  switch (originalWeekDay) {
    case 'Sunday':
      return 'Dom';
    case 'Monday':
      return 'Seg';
    case 'Tuesday':
      return 'Ter';
    case 'Thursday':
      return 'Quar';
    case 'Wednesday':
      return 'Qui';
    case 'Friday':
      return 'Sex';
    case 'Saturday':
      return 'Sáb';
    default:
      return 'Ind';
  }
}
