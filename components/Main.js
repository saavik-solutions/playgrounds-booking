

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGrounds } from '../redux/groundsSlice';

const Main = () => {
  const dispatch = useDispatch();
  const grounds = useSelector((state) => state.grounds.items);
  const loading = useSelector((state) => state.grounds.loading);
  const error = useSelector((state) => state.grounds.error);

  useEffect(() => {
    dispatch(fetchGrounds());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading grounds...</p>}
      {error && <p>Error: {error}</p>}
      {grounds && grounds.length > 0 ? (
        grounds.map((ground) => (
          <div key={ground._id}>
            <h3>{ground.groundName}</h3>
            {/* Render additional details here */}
          </div>
        ))
      ) : (
        !loading && <p>No grounds available</p>
      )}
    </div>
  );
};

export default Main;
