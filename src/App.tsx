// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import TabComponent from './components/TabComponent';
import TableComponent from './components/TableComponent';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';

function App() {
  const queryClient = new QueryClient();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getFetchRequest = async () => {
      const response = await axios.get(`http://localhost:3000/user`);
      console.log([...response.data, ...response.data]);
      setData([...response.data, ...response.data, ...response.data, ...response.data, ...response.data, ...response.data, ...response.data, ...response.data, ...response.data]);
    };

    getFetchRequest();
  }, []);

  const getData = async () => {
    const response = await axios.get(`http://localhost:3000/user`);
    console.log([...response.data, ...response.data]);
    setData([...response.data, ...response.data, ...response.data, ...response.data, ...response.data, ...response.data, ...response.data, ...response.data, ...response.data]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1 className="mx-5 my-4 text-3xl text-left font-bold">
          Company Settings
        </h1>
        {data.length !== 0 && (
          <>
            <TabComponent />
            <TableComponent fetchdata={data} />
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
