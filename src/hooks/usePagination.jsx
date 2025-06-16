import useUser from './user';

const {useState, useEffect, useCallback} = require('react');

const initialData = {
  data: [],
  status: true,
  pageNo: 1,
  totalPages: 1,
  totalResult: 0,
};

const usePagination = ({url, body}, dependencies = []) => {
  const [initialLoader, setInitialLoader] = useState(true);
  const [data, setData] = useState(initialData?.data);
  const [pageNo, setPageNo] = useState(initialData?.pageNo);
  const [totalPages, setTotalPages] = useState(initialData?.totalPages);
  const [totalResult, setTotalResult] = useState(initialData?.totalResult);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const user = useUser();
  //   console.log("userID", body?.userId)

  const fetchData = async (page, perPage = 10) => {
    try {
      const updatedBody = {
        ...body,
        page,
        pageSize: perPage,
      };
       const updatedBody_2 = {
        ...body,
        page,
        pageSize: perPage,
        userId: body?.userId ? body?.userId : user?.id,
      };
      const response = await url(body?.userId?updatedBody_2:updatedBody);
      const result = {
        data: response?.data?.posts,
        totalResult: response?.data?.metadata?.totalCount,
        status: true,
        pageNo: page,
        totalPages: response?.data?.metadata?.totalPages,
      };

      if (result?.status) {
        setData(page === 1 ? result?.data : [...data, ...result?.data]);
        setTotalResult(result?.totalResult);
        setPageNo(result?.pageNo);
        setTotalPages(result?.totalPages);
      } else {
        console.log('Failed to fetch data');
      }
    } catch (error) {
      console.log('Error fetching data', error);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
      setInitialLoader(false);
    }
  };

  useEffect(() => {
    fetchData(pageNo);
  }, dependencies);

  // Pull-to-refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(1);
  }, []);

  // Load more data
  const loadMore = () => {
    console.log('Loading more...');
    if (!loadingMore && pageNo < totalPages) {
      setLoadingMore(true);
      fetchData(pageNo + 1);
    }
  };

  return {
    data,
    totalResult,
    refreshing,
    loadingMore,
    handleRefresh,
    loadMore,
    initialLoader,
  };
};

export default usePagination;
