import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import {useMoveBack} from '../../hooks/useMoveBack';
import {useBooking} from './useBooking.js';
import Spinner from '../../ui/Spinner.jsx';
import Empty from '../../ui/Empty.jsx';
import {useNavigate} from 'react-router-dom';

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
  const {booking, isLoading} = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };
  
  if (isLoading) return <Spinner/>;
  
  const {status, id: bookingId} = booking;
  
  if (!booking) return <Empty resourceName="booking"/>;
  
  return (
      <>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{bookingId}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>
        
        <BookingDataBox booking={booking}/>
        
        <ButtonGroup>
          {status === 'unconfirmed' && (
              <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                Check in
              </Button>
          )}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </>
  );
}

export default BookingDetail;
