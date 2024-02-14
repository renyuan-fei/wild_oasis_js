import styled from 'styled-components';
import {formatCurrency, getImageNameFromUrl} from '../../utils/helpers.js';
import Spinner from '../../ui/Spinner.jsx';
import {useState} from 'react';
import CreateCabinForm from './CreateCabinForm.jsx';
import {useDeleteCabin} from './useDeleteCabin.js';
import {HiPencil, HiTrash} from 'react-icons/hi';
import Modal from '../../ui/Modal.jsx';
import ConfirmDelete from '../../ui/ConfirmDelete.jsx';

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono", serif;
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono", serif;
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({cabin}) {
  const {isDeleting, deleteCabin} = useDeleteCabin();
  const [showForm, setShowForm] = useState(false);
  
  const {
    id,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;
  
  const imageName = getImageNameFromUrl(image);
  
  if (isDeleting) return <Spinner/>;
  
  return (
      <>
        <TableRow role={'row'}>
          <Img src={image}/>
          <Cabin>{name}</Cabin>
          <div>Fits up tp {maxCapacity}</div>
          <Price>{formatCurrency(regularPrice)}</Price>
          {discount ? (
              <Discount>{formatCurrency(discount)}</Discount>
          ) : (
              <span>&mdash;</span>
          )}
          <div>
            <Modal>
              
              <Modal.Open opens={'edit'}>
                <button>
                  <HiPencil/>
                </button>
              </Modal.Open>
              <Modal.Window name={'edit'}>
                <CreateCabinForm cabinToEdit={cabin}/>
              </Modal.Window>
              
              <Modal.Open opens={'delete-Confirm'}>
                <button>
                  <HiTrash/>
                </button>
              </Modal.Open>
              <Modal.Window name={'delete-Confirm'}>
                <ConfirmDelete
                    resourceName={'cabins'}
                    disabled={isDeleting}
                    onConfirm={() => deleteCabin({id, imageName})}
                />
              </Modal.Window>
              
            </Modal>
          </div>
        </TableRow>
        {showForm && <CreateCabinForm cabinToEdit={cabin}/>}
      </>
  );
}

export default CabinRow;
