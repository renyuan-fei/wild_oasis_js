import styled from 'styled-components';
import {useRecentBookings} from './useRecentBookings.js';
import Spinner from '../../ui/Spinner.jsx';
import {useCabins} from '../cabins/useCabins.js';
import {useRecentStays} from './useRecentStays.js';
import Stats from './Stats.jsx';
import {TodayActivity} from '../check-in-out/TodayActivity.jsx';

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
  const {bookings, isLoading: isLoading1} = useRecentBookings();
  const {confirmedStays, isLoading: isLoading2, numDays} = useRecentStays();
  const {cabins, isLoading: isLoading3} = useCabins();
  
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner/>;
  
  return (
      <StyledDashboardLayout>
        <Stats
            bookings={bookings}
            confirmedStays={confirmedStays}
            numDays={numDays}
            cabinCount={cabins.length}
        />
        <TodayActivity/>
        <div>Chart stay durations</div>
        <div>Chart sales</div>
      </StyledDashboardLayout>
  );
}

export default DashboardLayout;
