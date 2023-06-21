import { useEffect, useState } from "react";
import { IChat } from "types/Chat";

function useFetchChatData(url: string, limit: number) {
  const [data, setData] = useState<IChat>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const fetchDataFromApi = async () => {
        const response = await fetch(url + `?limit=1`);
        if (!response.ok) {
          throw new Error("An error occurred when receiving data in the first request");
        }
        const jsonData: IChat = await response.json();
        const skipItemsCounter = jsonData.total - limit;
        const responseSliced = await fetch(url + `?skip=${skipItemsCounter}`);
        if (!responseSliced.ok) {
          throw new Error("An error occurred when receiving data in the second request");
        }
        const jsonDataSliced: IChat = await responseSliced.json();
        setData(jsonDataSliced);
        setLoading(false);
      };
      fetchDataFromApi();
    } catch (error) {
      console.error(error);
    }
  }, [url, limit]);

  return { data, isLoading };
}

export default useFetchChatData;
