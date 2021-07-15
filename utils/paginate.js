const paginate = (query, { page, pageSize }) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  // console.log('page : ', page);
  // console.log('pageSize : ', pageSize);
  // console.log('limit : ', limit);
  // console.log('offset : ', offset);
  // console.log({
  //   ...query,
  //   offset,
  //   limit
  // });
  return {
    ...query,
    offset,
    limit
  };
};

module.exports = paginate;
