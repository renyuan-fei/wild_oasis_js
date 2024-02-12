import styled from 'styled-components';
import Spinner from '../../ui/Spinner.jsx';
import CabinRow from './CabinRow.jsx';
import {useQuery} from '@tanstack/react-query';
import {getCabins} from '../../services/apiCabins.js';

const Table = styled.div`
    border: 1px solid var(--color-grey-200);

    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: 7px;
    overflow: hidden;
`;

const TableHeader = styled.header`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;

function CabinTable()
{
  const {
    isLoading,
    data: cabins,
  } = useQuery( {
                  queryKey: ['cabins'],
                  queryFn: getCabins,
                } );

  if ( isLoading ) return <Spinner/>

  return (
      <Table role="table">
        <TableHeader role="row">
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Status</div>
          <div>Available</div>
          <div>Booked</div>
          <div>Action</div>
        </TableHeader>

        {cabins.map( ( cabin ) => (
            <CabinRow key={cabin.id} cabin={cabin}/>
        ) )}
      </Table> );
}

export default CabinTable;