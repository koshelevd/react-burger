const getStatus = (code: 'done' | 'pending' | 'created' | undefined) => {
  switch (code) {
    case 'done':
      return 'Выполнен';
    case 'pending':
      return 'В работе';
    case 'created':
      return 'Создан';
  }
};

export default getStatus;
