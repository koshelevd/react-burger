import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';

const formatDate = (date: string | undefined) => {
  if (date) {
    const dateRelative = formatRelative(new Date(date), new Date(), {
      locale: ru,
    });
    const words = dateRelative.split(' в ');
    return words.join(', ') + ' i-GMT+3';
  }
};

export default formatDate;
