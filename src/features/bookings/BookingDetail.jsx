import styled from 'styled-components';
import {useBooking} from './useBooking.js';
import {useDeleteBooking} from './useDeleteBooking.js';
import {useMoveBack} from '../../hooks/useMoveBack.js';
import {useNavigate} from 'react-router-dom';
import {useCheckout} from '../check-in-out/useCheckout.js';
import Spinner from '../../ui/Spinner.jsx';
import Empty from '../../ui/Empty.jsx';
import Row from '../../ui/Row.jsx';
import Heading from '../../ui/Heading.jsx';
import Tag from '../../ui/Tag.jsx';
import ButtonText from '../../ui/ButtonText.jsx';
import BookingDataBox from './BookingDataBox.jsx';
import ButtonGroup from '../../ui/ButtonGroup.jsx';
import Button from '../../ui/Button.jsx';
import ConfirmDelete from '../../ui/ConfirmDelete.jsx';
import Modal from '../../ui/Modal.jsx';
import {HiArrowUpOnSquare} from 'react-icons/hi2';



const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
  const {booking, isLoading} = useBooking();
  const {deleteBooking, isDeleting} = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const {checkout, isCheckingOut} = useCheckout();
  
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
          
          {status === 'checked-in' && (
              <Button
                  icon={<HiArrowUpOnSquare/>}
                  onClick={() => checkout(bookingId)}
                  disabled={isCheckingOut}
              >
                Check out
              </Button>
          )}
          
          <Modal>
            <Modal.Open opens="delete">
              <Button variation="danger">Delete booking</Button>
            </Modal.Open>
            
            <Modal.Window name="delete">
              <ConfirmDelete
                  resourceName="booking"
                  disabled={isDeleting}
                  onConfirm={() =>
                      deleteBooking(bookingId, {
                        onSettled: () => navigate(-1),
                      })
                  }
              />
            </Modal.Window>
          </Modal>
          
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </>
  );
}

export default BookingDetail;
